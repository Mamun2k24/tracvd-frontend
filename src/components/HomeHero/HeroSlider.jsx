
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HOSTED_HERO =
  "https://i.ibb.co.com/8gQFhmwf/banner.jpg";

const LOCAL_HERO = "/images/trackvio-hero.png";

const certifications = [
  {
    id: 1,
    title: "সনদপ্রাপ্ত",
    image:
      "https://prohori.com/wp-content/uploads/2025/08/ISO-Logo.png",
    alt: "ISO Certified",
  },
  {
    id: 2,
    title: "অনুমোদিত",
    image:
      "https://prohori.com/wp-content/uploads/2025/08/BTRC-Logo.png",
    alt: "BTRC Approved",
  },
  {
    id: 3,
    title: "নিবন্ধিত",
    image:
      "https://prohori.com/wp-content/uploads/2025/08/VTS-PAB-Logo.png",
    alt: "VTSPAB Registered",
  },
];

export default function HeroSlider() {
  const [heroSrc, setHeroSrc] = useState(HOSTED_HERO);

  return (
    <section className="w-full overflow-hidden bg-white font-sans">

      {/* HERO BANNER */}
      <div className="relative mx-auto w-full max-w-[1920px] bg-[#e8efff]">
        <img
          src={heroSrc}
          onError={() => {
            if (heroSrc !== LOCAL_HERO) {
              setHeroSrc(LOCAL_HERO);
            }
          }}
          alt="Trackvio GPS Tracking Solutions"
          className="block h-auto w-full object-contain"
          width={1672}
          height={941}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* MOBILE CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-[#f5f7ff] px-4 py-5 md:hidden">
        <Link
          to="/pricing"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-md"
        >
          প্যাকেজ দেখুন →
        </Link>

        <a
          href="#how-it-works"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900"
        >
          কীভাবে কাজ করে?
        </a>
      </div>

      {/* RESPONSIVE CERTIFICATION SECTION */}
      <div className="bg-[#EAEAEA] px-3 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">

            {certifications.map((item) => (
              <div
                key={item.id}
                className="
                  flex min-w-0 min-h-[145px]
                  flex-col items-center justify-between
                  rounded-xl bg-white p-3
                  shadow-sm transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md
                  sm:min-h-[185px] sm:rounded-2xl sm:p-5
                  md:min-h-[220px] md:p-6
                "
              >
                {/* CERTIFICATE LOGO */}
                <div className="flex w-full flex-1 items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="
                      h-auto max-h-16 max-w-full
                      object-contain
                      sm:max-h-20
                      md:max-h-24
                    "
                    loading="lazy"
                  />
                </div>

                {/* CERTIFICATE TITLE */}
                <h3 className="mt-3 text-center text-sm font-bold text-gray-800 sm:text-base md:mt-4 md:text-lg">
                  {item.title}
                </h3>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

















// import React from "react";
// import {
//   ArrowRight,
//   BellRing,
//   Bike,
//   BusFront,
//   CarFront,
//   CheckCircle2,
//   LocateFixed,
//   MapPin,
//   Navigation,
//   Radio,
//   Route,
//   ShieldCheck,
//   Truck,
// } from "lucide-react";

// // Only the hero visual/content is redesigned. Certification cards remain unchanged.
// const certifications = [
//   {
//     id: 1,
//     title: "সনদপ্রাপ্ত",
//     image: "https://prohori.com/wp-content/uploads/2025/08/ISO-Logo.png",
//     alt: "ISO Certified",
//   },
//   {
//     id: 2,
//     title: "অনুমোদিত",
//     image: "https://prohori.com/wp-content/uploads/2025/08/BTRC-Logo.png",
//     alt: "BTRC Approved",
//   },
//   {
//     id: 3,
//     title: "নিবন্ধিত",
//     image: "https://prohori.com/wp-content/uploads/2025/08/VTS-PAB-Logo.png",
//     alt: "VTSPAB Registered",
//   },
// ];

// const vehicles = [
//   { name: "Bike", Icon: Bike, tone: "text-sky-600", panel: "bg-sky-50" },
//   { name: "Car", Icon: CarFront, tone: "text-orange-600", panel: "bg-orange-50" },
//   { name: "Bus", Icon: BusFront, tone: "text-violet-600", panel: "bg-violet-50" },
//   { name: "Truck", Icon: Truck, tone: "text-emerald-600", panel: "bg-emerald-50" },
// ];

// function TrackingPreview() {
//   return (
//     <div id="tracking-preview" className="relative mx-auto w-full max-w-[560px]" aria-label="GPS tracking dashboard demo visual">
//       <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
//       <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

//       <div className="relative overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-3 shadow-[0_32px_90px_-35px_rgba(15,23,42,0.36)] sm:p-4">
//         <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-3">
//           <div className="flex items-center gap-2.5">
//             <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white">
//               <LocateFixed size={19} />
//             </div>
//             <div>
//               <p className="text-sm font-extrabold leading-tight text-slate-900">Trackvio</p>
//               <p className="text-[11px] text-slate-500">GPS Dashboard · Demo</p>
//             </div>
//           </div>
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
//             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Demo Preview
//           </span>
//         </div>

//         <div className="hero-map relative mt-3 h-[235px] overflow-hidden rounded-[20px] sm:h-[305px]">
//           {/* Abstract road grid – this is a visual mockup, not a real map. */}
//           <div className="hero-road hero-road-a" aria-hidden="true" />
//           <div className="hero-road hero-road-b" aria-hidden="true" />
//           <div className="hero-road hero-road-c" aria-hidden="true" />
//           <div className="hero-road hero-road-d" aria-hidden="true" />
//           <div className="hero-route" aria-hidden="true" />

//           <div className="hero-pin absolute left-[21%] top-[31%] z-10">
//             <span className="hero-pin-pulse" />
//             <span className="relative grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30">
//               <CarFront size={23} />
//             </span>
//           </div>
//           <div className="absolute right-[14%] top-[22%] grid h-8 w-8 place-items-center rounded-full bg-white text-emerald-600 shadow-md">
//             <MapPin size={18} />
//           </div>
//           <div className="absolute bottom-[18%] left-[51%] grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white shadow-lg">
//             <Navigation size={17} />
//           </div>
//           <div className="absolute bottom-3 left-3 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
//             <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tracking preview</p>
//             <p className="mt-0.5 text-xs font-bold text-slate-800">Vehicle location concept</p>
//           </div>
//           <span className="absolute right-3 top-3 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-white">Illustration</span>
//         </div>

//         <div className="mt-3 grid grid-cols-3 gap-2">
//           <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
//             <MapPin className="mx-auto mb-1 text-orange-500" size={19} />
//             <p className="text-[11px] font-bold text-slate-800">Location</p>
//           </div>
//           <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
//             <Route className="mx-auto mb-1 text-sky-600" size={19} />
//             <p className="text-[11px] font-bold text-slate-800">Route History</p>
//           </div>
//           <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
//             <BellRing className="mx-auto mb-1 text-emerald-600" size={19} />
//             <p className="text-[11px] font-bold text-slate-800">Alerts</p>
//           </div>
//         </div>
//       </div>

//       <div className="hero-float absolute -left-2 top-[12%] z-20 hidden items-center gap-2 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-xl sm:flex lg:-left-10">
//         <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-600"><Radio size={19} /></span>
//         <span><span className="block text-[10px] text-slate-500">GPS Tracking</span><span className="block text-xs font-extrabold text-slate-900">Smart Monitoring</span></span>
//       </div>
//       <div className="hero-float-delayed absolute -bottom-4 -right-2 z-20 hidden items-center gap-2 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-xl sm:flex lg:-right-7">
//         <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><ShieldCheck size={19} /></span>
//         <span><span className="block text-[10px] text-slate-500">Vehicle Security</span><span className="block text-xs font-extrabold text-slate-900">Track with confidence</span></span>
//       </div>
//     </div>
//   );
// }

// const HeroSlider = () => {
//   return (
//     <section className="overflow-hidden bg-[#F5F8FC] font-sans">
//       <style>{`
//         @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//         @keyframes heroPulse { 0% { transform:scale(.65); opacity:.6; } 100% { transform:scale(2.3); opacity:0; } }
//         @keyframes heroDrift { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-12px) rotate(7deg); } }
//         .hero-float { animation: heroFloat 5s ease-in-out infinite; }
//         .hero-float-delayed { animation: heroFloat 5.8s ease-in-out 1s infinite; }
//         .hero-pin-pulse { position:absolute; inset:0; border-radius:999px; background:#fb923c; animation:heroPulse 2.2s ease-out infinite; }
//         .hero-orbit { position:absolute; border:1px dashed rgba(249,115,22,.32); border-radius:50%; pointer-events:none; }
//         .hero-orbit-one { width:115%; height:115%; top:-8%; left:-8%; }
//         .hero-orbit-two { width:132%; height:130%; top:-15%; left:-16%; }
//         .hero-map { background:linear-gradient(135deg,#e2f3ea,#e8f1fc 55%,#f1f6eb); }
//         .hero-map::before { content:''; position:absolute; inset:0; opacity:.6; background-image:linear-gradient(90deg,rgba(255,255,255,.9) 2px,transparent 2px),linear-gradient(rgba(255,255,255,.9) 2px,transparent 2px); background-size:49px 49px; transform:rotate(-12deg) scale(1.45); }
//         .hero-road { position:absolute; height:18px; width:145%; left:-20%; background:#fff; box-shadow:0 0 0 2px rgba(203,213,225,.4); border-radius:100px; }
//         .hero-road-a { top:25%; transform:rotate(19deg); }
//         .hero-road-b { top:67%; transform:rotate(-18deg); }
//         .hero-road-c { top:50%; transform:rotate(68deg); }
//         .hero-road-d { top:30%; transform:rotate(-54deg); }
//         .hero-route { position:absolute; left:26%; top:34%; width:49%; height:43%; border:4px dashed #f97316; border-left:0; border-bottom:0; border-radius:0 65px 0 0; opacity:.85; transform:rotate(-10deg); }
//         @media (prefers-reduced-motion: reduce) { .hero-float,.hero-float-delayed,.hero-pin-pulse { animation:none !important; } }
//       `}</style>

//       {/* HERO ONLY: new design */}
//       <div className="relative isolate px-4 pb-14 pt-14 sm:px-6 md:pb-20 md:pt-20 lg:px-8">
//         <div className="pointer-events-none absolute -left-32 top-16 -z-10 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />
//         <div className="pointer-events-none absolute -right-28 bottom-0 -z-10 h-96 w-96 rounded-full bg-sky-100/80 blur-3xl" />

//         <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
//           <div className="text-center lg:text-left">
//             <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700 sm:text-sm">
//               <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" /></span>
//               Smart GPS Tracking Solution
//             </div>
//             <h1 className="mt-6 text-[34px] font-extrabold leading-[1.35] tracking-tight text-[#12213D] sm:text-5xl lg:text-[53px]">
//               আপনার গাড়ি কোথায়?
//               <span className="mt-1 block text-orange-600">জানুন যেকোনো সময়।</span>
//             </h1>
//             <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 lg:mx-0 lg:text-lg">
//               বাইক, কার, বাস কিংবা ট্রাক—Trackvio GPS Tracking Solution দিয়ে
//               আপনার যানবাহনের অবস্থান, চলাচল এবং নিরাপত্তার তথ্য রাখুন হাতের মুঠোয়।
//             </p>

//             <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
//               <a href="#packages" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 px-7 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
//                 প্যাকেজ দেখুন <ArrowRight size={18} />
//               </a>
//               <a href="#tracking-preview" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-orange-300 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
//                 ডেমো দেখুন <Navigation size={17} />
//               </a>
//             </div>

//             <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-600 lg:justify-start">
//               <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={17} className="text-emerald-600" /> Location Tracking</span>
//               <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={17} className="text-emerald-600" /> Smart Alerts</span>
//               <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={17} className="text-emerald-600" /> Fleet Monitoring</span>
//             </div>
//           </div>

//           <TrackingPreview />
//         </div>

//         <div className="mx-auto mt-16 max-w-5xl md:mt-20">
//           <p className="mb-5 text-center text-xs font-bold uppercase tracking-[.19em] text-slate-500">এক প্ল্যাটফর্মে বিভিন্ন ধরনের যানবাহন</p>
//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//             {vehicles.map(({ name, Icon, tone, panel }) => (
//               <div key={name} className="group flex items-center gap-3 rounded-2xl border border-white bg-white p-4 shadow-[0_12px_35px_-20px_rgba(15,23,42,.28)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
//                 <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${panel} ${tone}`}>
//                   <Icon size={29} strokeWidth={1.8} className="transition-transform duration-300 group-hover:scale-110" />
//                 </span>
//                 <div><p className="font-extrabold text-slate-900">{name}</p><p className="text-[11px] text-slate-500">GPS Tracking</p></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CERTIFICATIONS: kept as in the original component */}
//       <div className="bg-[#EAEAEA] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
//         <div className="mx-auto max-w-5xl text-center">
//           <div className="grid grid-cols-1 gap-6 mx-auto max-w-4xl md:grid-cols-3">
//             {certifications.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between min-h-[220px]"
//               >
//                 <div className="flex-1 flex items-center justify-center w-full">
//                   <img
//                     src={item.image}
//                     alt={item.alt}
//                     className="max-h-24 w-auto object-contain"
//                   />
//                 </div>
//                 <h3 className="text-gray-800 font-bold text-lg mt-4">
//                   {item.title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSlider;
