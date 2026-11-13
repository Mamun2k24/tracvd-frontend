import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, BadgeCheck, Quote, Sparkles } from "lucide-react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000").replace(/\/$/, "");

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("bn-BD", { month: "short", year: "numeric" }).format(date);
};

const initials = (value) => String(value || "R").trim().charAt(0).toUpperCase();

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/site-reviews`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("রিভিউ লোড করা যায়নি");
        return response.json();
      })
      .then((data) => setReviews(Array.isArray(data.items) ? data.items : []))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const visible =
    reviews.length <= visibleCount
      ? reviews
      : Array.from({ length: visibleCount }, (_, i) => reviews[(offset + i) % reviews.length]);

  const average = reviews.length
    ? reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / reviews.length
    : 0;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/40 to-white py-16 md:py-24">
      {/* Subtle decorative background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 shadow-2xs">
            <Sparkles size={13} className="text-blue-600" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Trackvio ব্যবহারকারীদের কথা
          </h2>
          <p className="mt-3 text-sm text-slate-500 md:text-base">
            আমাদের প্ল্যাটফর্ম ব্যবহার করে যারা তাদের কাজের গতি বাড়িয়েছেন, তাদের বাস্তব অভিজ্ঞতা
          </p>
        </div>

        {/* Loading Skeleton State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            <div className="h-56 animate-pulse rounded-3xl bg-slate-200/60" />
            <div className="h-56 animate-pulse rounded-3xl bg-slate-200/60 md:col-span-3" />
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50/80 p-6 text-center text-sm font-medium text-red-600"
          >
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200/70 bg-white p-8 text-center text-sm text-slate-500 shadow-xs">
            এখনো কোনো প্রকাশিত রিভিউ নেই।
          </div>
        ) : (
          <div className="flex flex-col items-stretch gap-6 lg:flex-row">
            {/* Overall Rating Summary Card */}
            <div className="relative flex w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-3xl border border-blue-100/90 bg-white p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:w-56">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Overall Rating
              </span>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black tracking-tight text-slate-900">
                  {average.toFixed(1)}
                </span>
                <span className="text-base font-semibold text-slate-400">/ 5.0</span>
              </div>

              <div className="mt-3 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.round(average)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-100 text-slate-200"
                    }
                  />
                ))}
              </div>

              <div className="mt-4 w-full border-t border-slate-100 pt-3.5">
                <p className="text-xs font-semibold text-slate-700">
                  {reviews.length} টি ভেরিফাইড রিভিউ
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">সন্তুষ্ট গ্রাহকদের মতামত</p>
              </div>
            </div>

            {/* Carousel Controls & Cards */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                aria-label="Previous reviews"
                disabled={reviews.length <= visibleCount}
                onClick={() => setOffset((n) => (n - 1 + reviews.length) % reviews.length)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((item, idx) => {
                  const itemId = item._id || idx;
                  const commentText = item.comment || "";
                  const isExpanded = !!expanded[itemId];

                  return (
                    <article
                      key={itemId}
                      className="group relative flex min-h-[235px] flex-col justify-between rounded-3xl border border-slate-200/75 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200/90 hover:shadow-[0_14px_30px_rgb(37,99,235,0.08)]"
                    >
                      {/* Top Header: Avatar, Name, Date & Verified Badge */}
                      <div>
                        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                          <div className="flex min-w-0 items-center gap-3">
                            {item.avatar ? (
                              <img
                                src={item.avatar}
                                alt={item.name || "User"}
                                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-blue-50"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-xs">
                                {initials(item.name)}
                              </span>
                            )}
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-bold text-slate-900">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-400">{formatDate(item.reviewDate)}</p>
                            </div>
                          </div>

                          {item.verified && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
                              <BadgeCheck size={13} className="text-emerald-600" />
                              Verified
                            </span>
                          )}
                        </div>

                        {/* Rating Stars & Quote Watermark */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={15}
                                className={
                                  i < Number(item.rating || 0)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-slate-100 text-slate-200"
                                }
                              />
                            ))}
                          </div>

                          <Quote
                            size={24}
                            className="pointer-events-none text-slate-100 transition-colors duration-300 group-hover:text-blue-100"
                          />
                        </div>

                        {/* Review Comment */}
                        <p
                          className={`mt-3 whitespace-pre-wrap break-words text-[14px] leading-relaxed text-slate-600 ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {commentText}
                        </p>

                        {commentText.length > 95 && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded((old) => ({ ...old, [itemId]: !old[itemId] }))
                            }
                            className="mt-2 inline-flex items-center text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                          >
                            {isExpanded ? "কম দেখুন" : "আরও পড়ুন"}
                          </button>
                        )}
                      </div>

                      {/* Optional Google Source Link at Bottom */}
                      {item.source === "google" && item.sourceUrl && (
                        <div className="mt-4 flex justify-end pt-2">
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Google-এ আসল রিভিউ দেখুন"
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fill="#4285F4"
                                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                              />
                            </svg>
                            <span>Google Review</span>
                          </a>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Next reviews"
                disabled={reviews.length <= visibleCount}
                onClick={() => setOffset((n) => (n + 1) % reviews.length)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}