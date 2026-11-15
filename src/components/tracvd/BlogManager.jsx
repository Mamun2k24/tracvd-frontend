import React, { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, UploadCloud, X, Search, Eye, RefreshCw, BookOpen, Save } from "lucide-react";
import { BLOG_CATEGORIES, blogFetch, blogDate } from "../../components/tracvd/blogApi";

const blank = () => ({ title: "", excerpt: "", content: "", category: BLOG_CATEGORIES[0], coverImage: "", imageAlt: "", author: "Trackvio Team", tags: "", featured: false, status: "draft" });
const input = "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function BlogManager() {
    const [items, setItems] = useState([]), [page, setPage] = useState(1), [pages, setPages] = useState(0);
    const [search, setSearch] = useState(""), [keyword, setKeyword] = useState("");
    const [form, setForm] = useState(blank), [editing, setEditing] = useState(null), [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false), [uploading, setUploading] = useState(false), [loading, setLoading] = useState(false);
    const [error, setError] = useState(""), [notice, setNotice] = useState("");

    const load = useCallback(async () => {
        setLoading(true); setError("");
        try {
            const d = await blogFetch(`/admin?page=${page}&limit=12${keyword ? `&search=${encodeURIComponent(keyword)}` : ""}`, { admin: true });
            setItems(d.items || []); setPages(d.pages || 0);
        } catch (e) { setError(e.message); } finally { setLoading(false) }
    }, [page, keyword]);
    useEffect(() => { load() }, [load]);
    const edit = (item) => {
        setError(""); setNotice(""); setEditing(item._id); setOpen(true);
        setForm({ title: item.title || "", excerpt: item.excerpt || "", content: "", category: item.category || BLOG_CATEGORIES[0], coverImage: item.coverImage || "", imageAlt: item.imageAlt || "", author: item.author || "Trackvio Team", tags: (item.tags || []).join(", "), featured: !!item.featured, status: item.status || "draft" });
        blogFetch(`/admin/${item._id}`, { admin: true }).then(d => setForm({ title: d.item.title || "", excerpt: d.item.excerpt || "", content: d.item.content || "", category: d.item.category || BLOG_CATEGORIES[0], coverImage: d.item.coverImage || "", imageAlt: d.item.imageAlt || "", author: d.item.author || "Trackvio Team", tags: (d.item.tags || []).join(", "), featured: !!d.item.featured, status: d.item.status || "draft" })).catch(e => { setError(e.message); setOpen(false) });
    };
    const add = () => { setEditing(null); setForm(blank()); setError(""); setNotice(""); setOpen(true) };
    const change = e => { const { name, value, type, checked } = e.target; setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value })) };
    const upload = async e => {
        const file = e.target.files?.[0]; e.target.value = ""; if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("শুধু JPG, PNG বা WebP ছবি দিন"); return }
        if (file.size > 3 * 1024 * 1024) { setError("ছবি 3 MB-এর কম হতে হবে"); return }
        const fd = new FormData(); fd.append("image", file); setUploading(true); setError("");
        try { const d = await blogFetch("/admin/upload", { admin: true, method: "POST", body: fd }); setForm(p => ({ ...p, coverImage: d.url })); setNotice("ছবি আপলোড হয়েছে। ব্লগ Save করুন।") }
        catch (err) { setError(err.message) } finally { setUploading(false) }
    };
    const save = async e => {
        e.preventDefault(); if (busy || uploading) return;
        setBusy(true); setError(""); setNotice("");
        try {
            const payload = { ...form, tags: form.tags.split(",").map(x => x.trim()).filter(Boolean) };
            await blogFetch(editing ? `/admin/${editing}` : "/admin", { admin: true, method: editing ? "PATCH" : "POST", body: payload });
            setOpen(false); setNotice(editing ? "ব্লগ আপডেট হয়েছে" : "নতুন ব্লগ তৈরি হয়েছে"); await load();
        } catch (err) { setError(err.message) } finally { setBusy(false) }
    };
    const remove = async item => {
        if (!window.confirm(`"${item.title}" ব্লগটি স্থায়ীভাবে Delete করবেন?`)) return;
        setBusy(true); setError(""); try { await blogFetch(`/admin/${item._id}`, { admin: true, method: "DELETE" }); setNotice("ব্লগ Delete হয়েছে"); await load() }
        catch (e) { setError(e.message) } finally { setBusy(false) }
    };
    const toggle = async item => {
        setBusy(true); setError(""); try { await blogFetch(`/admin/${item._id}`, { admin: true, method: "PATCH", body: { status: item.status === "published" ? "draft" : "published" } }); await load() }
        catch (e) { setError(e.message) } finally { setBusy(false) }
    };

    return <main className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div><h1 className="flex items-center gap-2 text-2xl font-extrabold"><BookOpen className="text-blue-600" /> Blog Management</h1><p className="mt-1 text-sm text-slate-500">ব্লগ লিখুন, ছবি আপলোড করুন এবং Publish করুন।</p></div>
            <div className="flex gap-2"><button type="button" onClick={load} className="rounded-xl border bg-white p-3" title="Refresh"><RefreshCw size={18} /></button><button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"><Plus size={17} /> Add New Blog</button></div>
        </div>
        {notice && <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
        {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form className="mb-5 flex max-w-md gap-2" onSubmit={e => { e.preventDefault(); setPage(1); setKeyword(search.trim()) }}><div className="flex flex-1 items-center gap-2 rounded-lg border bg-white px-3"><Search size={17} className="text-slate-400" /><input placeholder="Search blog title..." value={search} onChange={e => setSearch(e.target.value)} className="w-full py-2 outline-none" /></div><button className="rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white">Search</button></form>
        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm"><table className="min-w-[820px] w-full text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-4">Thumbnail</th><th className="p-4">Blog Title</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Date</th><th className="p-4">Actions</th></tr></thead><tbody>{items.map(item => <tr key={item._id} className="border-t border-slate-100"><td className="p-3">{item.coverImage ? <img src={item.coverImage} alt="" className="h-14 w-24 rounded-lg object-cover" /> : <span className="text-slate-400">No photo</span>}</td><td className="max-w-[300px] p-3 font-semibold">{item.title}</td><td className="p-3 text-slate-600">{item.category}</td><td className="p-3"><button disabled={busy} onClick={() => toggle(item)} className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.status === "published" ? "Published" : "Draft"}</button></td><td className="p-3 text-xs text-slate-500">{blogDate(item.publishedAt || item.createdAt)}</td><td className="p-3"><div className="flex gap-2"><button title="Edit" onClick={() => edit(item)} className="rounded-lg bg-blue-50 p-2 text-blue-700"><Pencil size={17} /></button>{item.status === "published" && <a href={`/blog/${encodeURIComponent(item.slug)}`} target="_blank" rel="noopener noreferrer" title="View" className="rounded-lg bg-slate-100 p-2"><Eye size={17} /></a>}<button title="Delete" disabled={busy} onClick={() => remove(item)} className="rounded-lg bg-red-50 p-2 text-red-600"><Trash2 size={17} /></button></div></td></tr>)}</tbody></table>
            {loading && <p className="p-8 text-center text-slate-500">Loading...</p>}{!loading && !items.length && <p className="p-8 text-center text-slate-500">এখনো কোনো ব্লগ নেই। Add New Blog ক্লিক করুন।</p>}
        </div>
        {pages > 1 && <div className="mt-5 flex items-center justify-center gap-3"><button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">Previous</button><span className="text-sm">{page} / {pages}</span><button disabled={page >= pages} onClick={() => setPage(p => p + 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">Next</button></div>}
        {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3"><div role="dialog" aria-modal="true" aria-label={editing ? "Edit blog" : "Create blog"} className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">{editing ? "Edit Blog" : "Create New Blog"}</h2><button type="button" disabled={busy || uploading} onClick={() => setOpen(false)} aria-label="Close"><X size={23} /></button></div>
            {error && <p role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {notice && <p role="status" className="mb-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
            <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 text-sm font-semibold">Blog Title *<input required maxLength={180} name="title" value={form.title} onChange={change} placeholder="ব্লগের শিরোনাম" className={input} /></label>
                <label className="text-sm font-semibold">Category *<select name="category" value={BLOG_CATEGORIES.includes(form.category) ? form.category : "custom"} onChange={e => setForm(p => ({ ...p, category: e.target.value === "custom" ? "" : e.target.value }))} className={input}>{BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}<option value="custom">Other / Custom</option></select></label>
                <label className="text-sm font-semibold">Author<input name="author" value={form.author} onChange={change} className={input} /></label>
                {!BLOG_CATEGORIES.includes(form.category) && <label className="sm:col-span-2 text-sm font-semibold">Custom Category *<input required name="category" value={form.category} onChange={change} className={input} /></label>}
                <label className="sm:col-span-2 text-sm font-semibold">Short Summary (SEO / Card)<textarea rows={2} maxLength={400} name="excerpt" value={form.excerpt} onChange={change} className={input} /></label>
                <div className="sm:col-span-2 space-y-3 rounded-xl border border-slate-200 p-4"><p className="text-sm font-bold">Cover / Thumbnail Image</p><div className="flex flex-wrap items-center gap-4">{form.coverImage ? <img src={form.coverImage} alt="Cover preview" className="h-28 w-48 rounded-lg object-cover" /> : <div className="flex h-28 w-48 items-center justify-center rounded-lg bg-sky-50 text-slate-400">No image</div>}<label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"><UploadCloud size={18} />{uploading ? "Uploading..." : "Upload from Computer"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading || busy} onChange={upload} className="sr-only" /></label></div><p className="text-xs text-slate-500">JPG, PNG, WebP · Maximum 3 MB · Recommended 1200 × 675 px</p><label className="block text-sm">অথবা Image URL<input type="url" name="coverImage" value={form.coverImage} onChange={change} placeholder="https://..." className={input} /></label><label className="block text-sm">Image Alt Text<input name="imageAlt" value={form.imageAlt} onChange={change} className={input} /></label></div>
                <label className="sm:col-span-2 text-sm font-semibold">Full Blog Article *<p className="mb-1 text-xs font-normal text-slate-500">অনুচ্ছেদ আলাদা করতে ফাঁকা লাইন, Heading-এর জন্য ##, List-এর জন্য - ব্যবহার করুন। HTML নয়।</p><textarea required name="content" value={form.content} onChange={change} rows={13} placeholder={"## পরিচিতি\n\nএখানে বিস্তারিত লিখুন...\n\n## প্রধান সুবিধা\n\n- লাইভ ট্র্যাকিং\n- নিরাপত্তা"} className={`${input} font-sans leading-7`} /></label>
                <label className="sm:col-span-2 text-sm font-semibold">Tags (comma separated)<input name="tags" value={form.tags} onChange={change} placeholder="GPS, গাড়ির নিরাপত্তা" className={input} /></label>
                <label className="text-sm font-semibold">Status<select name="status" value={form.status} onChange={change} className={input}><option value="draft">Draft (Hidden)</option><option value="published">Published (Public)</option></select></label>
                <label className="flex items-center gap-2 pt-5 text-sm font-medium"><input type="checkbox" name="featured" checked={form.featured} onChange={change} /> Featured Blog</label>
                <div className="flex flex-wrap gap-3 border-t pt-4 sm:col-span-2"><button disabled={busy || uploading} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"><Save size={17} />{busy ? "Saving..." : editing ? "Update Blog" : "Save Blog"}</button><button type="button" onClick={() => setOpen(false)} disabled={busy || uploading} className="rounded-xl border px-5 py-3">Cancel</button></div>
            </form>
        </div></div>}
    </main>;
}
