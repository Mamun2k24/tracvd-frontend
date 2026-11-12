import React, { useEffect, useMemo, useState } from "react";

/** Build absolute URL for /uploads/... coming from backend */
function buildAssetUrl(apiBase, maybePath) {
  if (!maybePath) return "";
  const s = String(maybePath);

  // already absolute
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  // normalize base (remove trailing slash)
  const base = String(apiBase || "").replace(/\/$/, "");

  // if it starts with /uploads or /something, prefix with base
  if (s.startsWith("/")) return `${base}${s}`;

  // fallback
  return `${base}/${s}`;
}

function makePlaceholderDataUri(name) {
  const initials = (name || "Client")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='500' height='300'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0' stop-color='#f1f5f9'/>
            <stop offset='1' stop-color='#e2e8f0'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#g)'/>
        <rect x='24' y='24' width='452' height='252' rx='18' fill='#ffffff' opacity='0.55'/>
        <text x='50%' y='52%' text-anchor='middle' dominant-baseline='middle'
          font-family='Arial, sans-serif' font-size='42' fill='#94a3b8'>
          ${initials || "CL"}
        </text>
        <text x='50%' y='70%' text-anchor='middle' dominant-baseline='middle'
          font-family='Arial, sans-serif' font-size='16' fill='#94a3b8'>
          ${String(name || "Client").slice(0, 18)}
        </text>
      </svg>
    `)
  );
}

function ClientCard({ name, logoUrl, href = "#" }) {
  const placeholder = useMemo(() => makePlaceholderDataUri(name), [name]);
  const hasExternalLink = href && href !== "#";

  return (
    <a
      href={href}
      target={hasExternalLink ? "_blank" : undefined}
      rel={hasExternalLink ? "noopener noreferrer" : undefined}
      className="
        group flex flex-col justify-between rounded-xl border border-slate-200/80
        bg-white p-5 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:border-orange-400/60 hover:shadow-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500
      "
      title={name || "Client"}
    >
      {/* Client Logo Container */}
      <div className="flex aspect-[5/3] w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50/70 p-3">
        <img
          src={logoUrl || placeholder}
          alt={name || "client"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = placeholder;
          }}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Client Name */}
      <div className="mt-4 border-t border-slate-100 pt-3 text-center">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-700 transition-colors group-hover:text-orange-600">
          {name}
        </h3>
      </div>
    </a>
  );
}

export default function Clients() {
  const API = import.meta.env.VITE_APP_SERVER_URL; // e.g. http://localhost:5000/
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // 100% Same API endpoint used in dashboard & brands
        const res = await fetch(`${API}api/brands`);
        if (!res.ok) throw new Error("Failed to fetch clients");

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.brands || [];

        if (!alive) return;
        setClients(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        if (alive) setClients([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [API]);

  const activeClients = useMemo(() => {
    return (clients || []).filter((item) => item?.isActive !== false);
  }, [clients]);

  const mapped = useMemo(() => {
    return activeClients.map((c) => ({
      id: c?._id || c?.id || c?.name,
      name: c?.name || "Client",
      href: c?.website || "#",
      logoUrl: buildAssetUrl(API, c?.logo),
    }));
  }, [activeClients, API]);

  return (
    <section className="min-h-screen bg-slate-50/50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-600">
            OUR VALUED CLIENTS
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            আমাদের সম্মানিত{" "}
            <span className="bg-gradient-to-r from-[#ff7415] to-[#ff9b21] bg-clip-text text-transparent">
              ক্লায়েন্টসমূহ
            </span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            দেশের শীর্ষস্থানীয় প্রতিষ্ঠান ও কোম্পানিগুলো তাদের ফ্লিট এবং গাড়ির নিরাপত্তার জন্য আমাদের ওপর আস্থা রাখছে।
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="aspect-[5/3] rounded-lg bg-slate-100 animate-pulse" />
                <div className="mx-auto mt-4 h-4 w-2/3 rounded bg-slate-100 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Clients Grid */}
        {!loading && mapped.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mapped.map((client) => (
              <ClientCard
                key={client.id}
                name={client.name}
                logoUrl={client.logoUrl}
                href={client.href}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && mapped.length === 0 && (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
            এখনো কোনো ক্লায়েন্ট যুক্ত করা হয়নি।
          </div>
        )}
      </div>
    </section>
  );
}