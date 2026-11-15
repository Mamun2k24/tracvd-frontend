import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, BookOpen } from "lucide-react";
import { blogFetch, blogDate } from "../../components/tracvd/blogApi";
export default function BlogCategory() {
    const { category } = useParams();
    const [params, setParams] = useSearchParams();
    const page = Math.max(1, parseInt(params.get("page"), 10) || 1);
    const [data, setData] = useState({ items: [], pages: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        let alive = true; setLoading(true); setError("");
        blogFetch(`?category=${encodeURIComponent(category)}&page=${page}&limit=9`).then(d => { if (alive) setData(d); }).catch(e => { if (alive) setError(e.message); }).finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [category, page]);
    return <main className="min-h-screen bg-slate-50 py-10"><div className="mx-auto max-w-6xl px-4">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600"><ArrowLeft size={16} /> সব ব্লগ</Link>
        <h1 className="my-6 border-l-4 border-blue-600 pl-3 text-2xl font-bold text-slate-900">{category}</h1>
        {loading ? <p>লোড হচ্ছে...</p> : error ? <p className="text-red-600">{error}</p> : data.items.length === 0 ? <p className="py-16 text-slate-500">এই ক্যাটাগরিতে কোনো ব্লগ নেই।</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.items.map(item => <Link key={item._id} to={`/blog/${encodeURIComponent(item.slug)}`} className="overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg">
            <div className="aspect-video bg-sky-50">{item.coverImage ? <img src={item.coverImage} alt={item.imageAlt || item.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><BookOpen /></div>}</div>
            <div className="p-4"><h2 className="line-clamp-2 font-bold text-slate-900">{item.title}</h2><p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><CalendarDays size={13} />{blogDate(item.publishedAt || item.createdAt)}</p><p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.excerpt}</p></div>
        </Link>)}</div>}
        <div className="mt-8 flex justify-center gap-3">{page > 1 && <button className="rounded-lg border bg-white px-4 py-2 text-sm" onClick={() => setParams({ page: String(page - 1) })}>আগের পৃষ্ঠা</button>}{page < data.pages && <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white" onClick={() => setParams({ page: String(page + 1) })}>পরের পৃষ্ঠা</button>}</div>
    </div></main>;
}
