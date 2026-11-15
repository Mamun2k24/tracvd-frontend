import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, UserRound, Share2 } from "lucide-react";
import { blogFetch, blogDate } from "../../components/tracvd/blogApi";

// Safe plain-text article rendering; supports #/##/### headings, bullets and paragraphs.
// We intentionally do not inject untrusted HTML into the DOM.
function ArticleBody({ content }) {
    return <div className="space-y-4 text-[16px] leading-8 text-slate-700">{String(content || "").split(/\n\s*\n/).map((block, i) => {
        const t = block.trim(); if (!t) return null;
        if (/^###\s+/.test(t)) return <h3 key={i} className="pt-3 text-lg font-bold text-slate-900">{t.replace(/^###\s+/, "")}</h3>;
        if (/^##\s+/.test(t)) return <h2 key={i} className="pt-4 text-2xl font-bold text-slate-900">{t.replace(/^##\s+/, "")}</h2>;
        if (/^#\s+/.test(t)) return <h2 key={i} className="pt-4 text-2xl font-bold text-slate-900">{t.replace(/^#\s+/, "")}</h2>;
        if (t.split("\n").every(s => /^[-*] /.test(s.trim()))) return <ul key={i} className="list-disc space-y-2 pl-6">{t.split("\n").map((s, j) => <li key={j}>{s.trim().slice(2)}</li>)}</ul>;
        return <p key={i} className="whitespace-pre-line">{t}</p>;
    })}</div>;
}
export default function BlogDetails() {
    const { slug } = useParams(); const [data, setData] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
    useEffect(() => {
        let alive = true; setLoading(true); setError(""); window.scrollTo?.(0, 0);
        blogFetch(`/${encodeURIComponent(slug)}`).then(d => { if (alive) setData(d) }).catch(e => { if (alive) setError(e.message) }).finally(() => { if (alive) setLoading(false) });
        return () => { alive = false };
    }, [slug]);
    if (loading) return <main className="mx-auto min-h-[50vh] max-w-4xl px-4 py-16">লোড হচ্ছে...</main>;
    if (error || !data) return <main className="mx-auto min-h-[50vh] max-w-4xl px-4 py-16 text-red-600">{error || "ব্লগ পাওয়া যায়নি"}</main>;
    const { item, related = [] } = data;
    return <main className="bg-slate-50 py-10"><article className="mx-auto max-w-4xl px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600"><ArrowLeft size={16} /> সব ব্লগ</Link>
        <div className="my-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <Link to={`/blog/category/${encodeURIComponent(item.category)}`} className="text-xs font-bold text-blue-600">{item.category}</Link>
            <h1 className="mt-3 text-2xl font-extrabold leading-relaxed text-slate-900 sm:text-4xl">{item.title}</h1>
            <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-500"><span className="flex items-center gap-1"><UserRound size={14} />{item.author}</span><span className="flex items-center gap-1"><CalendarDays size={14} />{blogDate(item.publishedAt || item.createdAt)}</span></div>
            {item.coverImage && <img className="mt-6 aspect-video w-full rounded-xl object-cover" src={item.coverImage} alt={item.imageAlt || item.title} />}
            {item.excerpt && <p className="my-6 border-l-4 border-blue-500 pl-4 text-lg font-medium text-slate-700">{item.excerpt}</p>}
            <div className="mt-7"><ArticleBody content={item.content} /></div>
            {item.tags?.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{item.tags.map(t => <span key={t} className="rounded-full bg-sky-50 px-3 py-1 text-xs text-blue-700">#{t}</span>)}</div>}
            <button type="button" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600" onClick={() => navigator.clipboard?.writeText(window.location.href)}><Share2 size={16} /> লিংক কপি করুন</button>
        </div>
        {related.length > 0 && <section className="mt-10"><h2 className="mb-5 text-xl font-bold text-slate-900">আরও পড়ুন</h2><div className="grid gap-4 sm:grid-cols-3">{related.map(b => <Link key={b._id} to={`/blog/${encodeURIComponent(b.slug)}`} className="overflow-hidden rounded-xl bg-white shadow-sm">{b.coverImage && <img src={b.coverImage} alt={b.title} className="aspect-video w-full object-cover" />}<p className="p-3 text-sm font-bold">{b.title}</p></Link>)}</div></section>}
    </article></main>;
}
