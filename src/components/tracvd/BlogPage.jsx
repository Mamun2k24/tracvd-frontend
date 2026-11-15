import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, BookOpen, CalendarDays } from "lucide-react";
import { blogFetch, BLOG_CATEGORIES, blogDate } from "../../lib/blogApi";

const Card = ({ item }) => (
    <Link to={`/blog/${encodeURIComponent(item.slug)}`} className="group overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
            {item.coverImage ? <img src={item.coverImage} alt={item.imageAlt || item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-100 to-slate-200"><BookOpen size={36} className="text-blue-500" /></div>}
        </div>
        <div className="px-3 py-3 sm:px-4">
            <p className="line-clamp-2 min-h-[2.8em] text-sm font-bold leading-6 text-slate-900 group-hover:text-blue-700">{item.title}</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><CalendarDays size={13} /> {blogDate(item.publishedAt || item.createdAt)}</p>
        </div>
    </Link>
);
const Section = ({ title, items }) => (
    <section className="py-9 sm:py-12 even:bg-gradient-to-r even:from-white even:to-sky-50 odd:bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-4">
            <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="border-l-[3px] border-blue-600 pl-3 text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
                <Link to={`/blog/category/${encodeURIComponent(title)}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 sm:text-sm">আরও দেখুন <ArrowRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(x => <Card key={x._id} item={x} />)}</div>
        </div>
    </section>
);
export default function Blog() {
    const [params, setParams] = useSearchParams();
    const [search, setSearch] = useState(params.get("search") || "");
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const query = params.get("search") || "";
    useEffect(() => {
        let alive = true; setLoading(true); setError("");
        blogFetch("/categories")
            .then(({ items: categories = [] }) => {
                const names = [...new Set([...BLOG_CATEGORIES, ...categories.map(c => c.name)])];
                return Promise.all(names.map(async name => {
                    const d = await blogFetch(`?category=${encodeURIComponent(name)}&limit=3${query ? `&search=${encodeURIComponent(query)}` : ""}`);
                    return { name, items: d.items || [] };
                }));
            })
            .then(result => { if (alive) setGroups(result.filter(g => g.items.length > 0)); })
            .catch(e => { if (alive) setError(e.message); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [query]);
    return <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="border-b border-slate-200 bg-gradient-to-r from-white via-sky-50 to-blue-50 py-10">
            <div className="mx-auto max-w-6xl px-4">
                <h1 className="text-3xl font-extrabold sm:text-4xl">Trackvio <span className="text-blue-600">Blog</span></h1>
                <p className="mt-2 text-sm text-slate-600">জিপিএস ট্র্যাকিং, গাড়ির নিরাপত্তা ও অটোমোবাইল বিষয়ে দরকারি লেখা।</p>
                <form className="mt-6 flex max-w-lg items-center gap-2" onSubmit={e => { e.preventDefault(); setParams(search.trim() ? { search: search.trim() } : {}); }}>
                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search size={18} className="text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="ব্লগ খুঁজুন..." className="w-full py-3 text-sm outline-none" /></div>
                    <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">খুঁজুন</button>
                </form>
            </div>
        </div>
        {loading && <p className="py-20 text-center text-slate-500">ব্লগ লোড হচ্ছে...</p>}
        {error && <p role="alert" className="mx-auto max-w-6xl px-4 py-12 text-red-600">{error}</p>}
        {!loading && !error && groups.length === 0 && <div className="mx-auto max-w-6xl px-4 py-20 text-center text-slate-500">এখনো কোনো প্রকাশিত ব্লগ পাওয়া যায়নি।</div>}
        {!loading && !error && groups.map(group => <Section key={group.name} title={group.name} items={group.items} />)}
        {!loading && !error && query && <div className="py-8 text-center"><Link to="/blog" className="font-semibold text-blue-600">সব ব্লগ দেখুন</Link></div>}
    </main>;
}
