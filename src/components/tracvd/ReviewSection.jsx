import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from "lucide-react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000").replace(/\/$/, "");
const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("bn-BD", { month: "short", year: "numeric" }).format(date);
};
const initials = (value) => String(value || "R").trim().charAt(0).toUpperCase();

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/site-reviews`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("রিভিউ লোড করা যায়নি");
        return response.json();
      })
      .then((data) => setReviews(Array.isArray(data.items) ? data.items : []))
      .catch((err) => { if (err.name !== "AbortError") setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const visibleCount = 3;
  const visible = reviews.length <= visibleCount ? reviews : Array.from({ length: visibleCount }, (_, i) => reviews[(offset + i) % reviews.length]);
  const average = reviews.length ? reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / reviews.length : 0;
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-9 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Customer testimonials</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Trackvio ব্যবহারকারীদের কথা</h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-blue-600" />
        </div>
        {loading ? <p className="text-center text-slate-500">রিভিউ লোড হচ্ছে...</p> : error ? <p role="alert" className="text-center text-red-600">{error}</p> : reviews.length === 0 ? <p className="text-center text-slate-500">এখনো কোনো প্রকাশিত রিভিউ নেই।</p> : (
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-stretch">
            <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm lg:w-48">
              <span className="text-3xl font-black text-slate-900">{average.toFixed(1)}<span className="text-lg text-slate-400">/5</span></span>
              <div className="mt-2 flex gap-1 text-blue-600">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={19} fill={i < Math.round(average) ? "currentColor" : "none"} />)}</div>
              <p className="mt-2 text-xs font-semibold text-slate-500">{reviews.length} published reviews</p>
              <span className="mt-3 text-xs font-medium text-slate-400">Customer feedback</span>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button type="button" aria-label="Previous reviews" disabled={reviews.length <= visibleCount} onClick={() => setOffset((n) => (n - 1 + reviews.length) % reviews.length)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white text-slate-700 shadow-sm transition hover:bg-blue-50 disabled:opacity-30"><ChevronLeft size={19}/></button>
              <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((item) => {
                  const isExpanded = !!expanded[item._id];
                  return <article key={item._id} className="min-h-[205px] rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-3">
                        {item.avatar ? <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover" referrerPolicy="no-referrer" /> : <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{initials(item.name)}</span>}
                        <div className="min-w-0"><h3 className="truncate text-sm font-semibold text-slate-900">{item.name}</h3><p className="text-xs text-slate-500">{formatDate(item.reviewDate)}</p></div>
                      </div>
                      {item.source === "google" && item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" title="View source review" className="font-bold text-blue-600">G</a>}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-blue-600">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} />)}{item.verified && <BadgeCheck aria-label="Verified review" size={16} className="ml-1 text-blue-600" />}</div>
                    <p className={`mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600 ${isExpanded ? "" : "line-clamp-3"}`}>{item.comment}</p>
                    {item.comment.length > 95 && <button type="button" onClick={() => setExpanded((old) => ({...old, [item._id]: !old[item._id]}))} className="mt-2 text-xs font-semibold text-blue-700 hover:underline">{isExpanded ? "Read less" : "Read more"}</button>}
                  </article>;
                })}
              </div>
              <button type="button" aria-label="Next reviews" disabled={reviews.length <= visibleCount} onClick={() => setOffset((n) => (n + 1) % reviews.length)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white text-slate-700 shadow-sm transition hover:bg-blue-50 disabled:opacity-30"><ChevronRight size={19}/></button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
