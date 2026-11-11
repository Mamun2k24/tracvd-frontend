import React, { useState } from "react";

import {

  ArrowDown,

  ChevronDown,

  ChevronLeft,

  ChevronRight,

  MapPin,

  History,

  ShieldAlert,

  Fuel,

  FileText,

  Power,

  Clock,

  Check,

  X,

  Phone,

  Sparkles,

  Car,

  Briefcase,

  Truck,

  Star

} from "lucide-react";

import PopularProduct from "../../pages/home/sections/popularProducts/PopularProducts";

const BANNER =

  "https://i.ibb.co.com/1Gghbn4x/tracview-b1.jpg";

const TRACKING_IMAGE =

  "https://i.ibb.co.com/xtxVs1gk/hero.png";

const PHONE = "01700786848";

const questions = [

  {

    q: "GPS ট্র্যাকার কীভাবে কাজ করে?",

    a: "GPS ট্র্যাকার স্যাটেলাইটের সংকেত থেকে অবস্থান নির্ণয় করে এবং মোবাইল নেটওয়ার্কের মাধ্যমে অ্যাপ বা ওয়েব পোর্টালে তথ্য পাঠায়।",

  },

  {

    q: "কোন প্যাকেজটি আমার জন্য উপযুক্ত?",

    a: "আপনার গাড়ির ধরন, প্রয়োজনীয় ফিচার ও বাজেট অনুযায়ী প্যাকেজ নির্বাচন করতে পারবেন।",

  },

  {

    q: "ইনস্টলেশন ও সার্ভিস চার্জ কত?",

    a: "চার্জ নির্দিষ্ট ডিভাইস ও সার্ভিস প্যাকেজের ওপর নির্ভর করে। বিস্তারিত জানতেTrackvio টিমের সঙ্গে যোগাযোগ করুন।",

  },

  {

    q: "একাধিক গাড়ি কি একই অ্যাকাউন্টে দেখা যাবে?",

    a: "এটি নির্বাচিত প্যাকেজ ও সফটওয়্যার সুবিধার ওপর নির্ভর করে।",

  },

];

// গুগল রিভিউ ডাটা

const reviewsData = [

  {

    id: 1,

    name: "Rj rock yt",

    time: "7 months ago",

    rating: 5,

    comment: "good",

    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",

  },

  {

    id: 2,

    name: "Momenur Rahman",

    time: "1 year ago",

    rating: 5,

    comment:

      "I think this is the best tracker in Our country. 15 months I use this tracker...",

    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",

  },

  {

    id: 3,

    name: "Dr Md Ali Mazrui ...",

    time: "1 year ago",

    rating: 5,

    comment: "Very Good Service.",

    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",

  },

];

const featureComparison = [

  {

    name: "লাইভ লোকেশন ট্র্যাকিং (Real-time)",

    icon: MapPin,

    basic: true,

    standard: true,

    enterprise: true,

  },

  {

    name: "ইঞ্জিন দূর থেকে বন্ধ (Remote Engine Lock)",

    icon: Power,

    basic: true,

    standard: true,

    enterprise: true,

  },

  {

    name: "ট্রিপ ও ট্রাভেল হিস্ট্রি (Travel History)",

    icon: History,

    basic: "৩০ দিন",

    standard: "৯০ দিন",

    enterprise: "৩৬৫ দিন",

  },

  {

    name: "জিওফেন্স অ্যালার্ট (Geo-fence Boundary)",

    icon: ShieldAlert,

    basic: true,

    standard: true,

    enterprise: true,

  },

  {

    name: "দৈনিক ও মাসিক রিপোর্ট (Advanced Reports)",

    icon: FileText,

    basic: "বেসিক",

    standard: "বিস্তারিত",

    enterprise: "কাস্টমাইজড",

  },

  {

    name: "ফুয়েল মনিটরিং সেন্সর (Fuel Sensor)",

    icon: Fuel,

    basic: false,

    standard: "ঐচ্ছিক",

    enterprise: true,

  },

  {

    name: "২৪/৭ কাস্টমার সাপোর্ট",

    icon: Clock,

    basic: true,

    standard: true,

    enterprise: true,

  },

];

const DEMO_API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000").replace(/\/$/, "");

const FALLBACK_VEHICLES = ["প্রাইভেট কার", "মোটরসাইকেল", "মাইক্রোবাস", "বাস", "ট্রাক", "পিকআপ", "অন্যান্য"];

function DemoForm() {

  const [form, setForm] = useState({ name: "", phone: "", vehicle: "", website: "" });

  const [vehicleTypes, setVehicleTypes] = useState(FALLBACK_VEHICLES);

  const [enabled, setEnabled] = useState(true);

  const [title, setTitle] = useState("ফর্মটি পূরণ করেTrackvio GPS ট্র্যাকারের ডেমো দেখুন!");

  const [notice, setNotice] = useState("");

  const [success, setSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {

    const controller = new AbortController();

    fetch(`${DEMO_API_BASE}/api/demo/settings`, { signal: controller.signal })

      .then(async (response) => {

        if (!response.ok) throw new Error("Demo settings could not be loaded");

        return response.json();

      })

      .then((settings) => {

        setEnabled(settings.enabled !== false);

        if (settings.title) setTitle(settings.title);

        if (Array.isArray(settings.vehicleTypes) && settings.vehicleTypes.length) {

          setVehicleTypes(settings.vehicleTypes);

        }

      })

      .catch((error) => {

        if (error.name !== "AbortError") console.error("Demo settings:", error);

      });

    return () => controller.abort();

  }, []);

  const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));

    setNotice("");

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (submitting) return;

    const name = form.name.trim();

    const phone = form.phone.trim();

    if (name.length < 2 || !/^01[3-9]\d{8}$/.test(phone) || !vehicleTypes.includes(form.vehicle)) {

      setSuccess(false);

      setNotice("সঠিক নাম, ১১ সংখ্যার মোবাইল নম্বর ও গাড়ির ধরন দিন।");

      return;

    }

    setSubmitting(true);

    setSuccess(false);

    setNotice("");

    try {

      const response = await fetch(`${DEMO_API_BASE}/api/demo/requests`, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ name, phone, vehicle: form.vehicle, website: form.website }),

      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.message || "ডেমো রিকোয়েস্ট পাঠানো যায়নি।");

      setSuccess(true);

      setNotice(result.message || "আপনার ডেমো রিকোয়েস্ট গ্রহণ করা হয়েছে।");

      setForm({ name: "", phone: "", vehicle: "", website: "" });

    } catch (error) {

      setNotice(error.message || "Network error. আবার চেষ্টা করুন।");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <form

      onSubmit={handleSubmit}

      className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"

    >

      <div className="relative flex min-h-[110px] items-center justify-between gap-3 bg-[#ff871c] px-6 py-5 text-white sm:px-8">

        <h3 className="max-w-[230px] text-lg font-semibold leading-relaxed sm:text-xl">

          {title}

        </h3>

        <div className="flex h-20 w-20 shrink-0 rotate-[-12deg] flex-col items-center justify-center rounded-full bg-[#526b7d] text-center font-black leading-none text-white shadow-sm">

          <span className="text-xl">FREE</span>

          <span className="mt-1 bg-[#e63c50] px-2 py-1 text-lg">TRIAL</span>

        </div>

      </div>

      {enabled ? (

        <div className="space-y-5 px-6 py-8 sm:px-8">

          <input type="text" name="name" required maxLength={100} value={form.name}

            onChange={handleChange} placeholder="আপনার নাম"

            className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />

          <input type="tel" name="phone" required maxLength={11} inputMode="numeric"

            value={form.phone} onChange={handleChange} placeholder="মোবাইল নম্বর"

            className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />

          <select name="vehicle" required value={form.vehicle} onChange={handleChange}

            className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500">

            <option value="">গাড়ির ধরন</option>

            {vehicleTypes.map((vehicle) => <option key={vehicle} value={vehicle}>{vehicle}</option>)}

          </select>

          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>

            <label htmlFor="pricing-demo-website">Website</label>

            <input id="pricing-demo-website" name="website" autoComplete="off" tabIndex={-1}

              value={form.website} onChange={handleChange} />

          </div>

          <p className="text-center text-xs text-gray-500">

            আপনার তথ্য শুধু ডেমোর বিষয়ে যোগাযোগ করতে ব্যবহার করা হবে।

          </p>

          {notice && <p role="status" className={`rounded-md p-3 text-center text-sm ${success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{notice}</p>}

          <div className="pt-2 text-center">

            <button type="submit" disabled={submitting}

              className="w-full rounded-md bg-[#ff871c] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#ed7010] disabled:cursor-not-allowed disabled:opacity-60">

              {submitting ? "পাঠানো হচ্ছে..." : "চলুন ট্র্যাক করি"}

            </button>

          </div>

        </div>

      ) : (

        <p className="p-8 text-center text-gray-700">ডেমো রিকোয়েস্ট সাময়িকভাবে বন্ধ আছে।</p>

      )}

    </form>

  );

}

function DemoSection() {

  return (

    <section id="pricing-demo" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-white via-orange-50/50 to-sky-50 py-12 md:py-20">

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-2 lg:gap-16">

        <div className="flex flex-col items-center text-center md:pt-7">

          <h2 className="max-w-[490px] text-xl font-semibold leading-relaxed text-gray-900 md:text-2xl">

           Trackvio GPS Tracker কিভাবে কাজ করে তার ডেমো দেখতে ফর্মটি পূরণ করুন

          </h2>

          <img

            src={TRACKING_IMAGE}

            alt="trackvd GPS live vehicle tracking demonstration"

            loading="lazy"

            className="mt-7 h-auto w-full max-w-[510px] object-contain"

          />

          <p className="mt-8 text-lg font-semibold leading-relaxed text-gray-900 md:text-2xl">

            অথবা যোগাযোগ করুন:{" "}

            <a

              href={`tel:${PHONE}`}

              className="whitespace-nowrap text-[#ff5722] hover:underline"

            >

              {PHONE}

            </a>

          </p>

        </div>

        <div className="mx-auto w-full max-w-[420px]">

          <DemoForm />

        </div>

      </div>

    </section>

  );

}

// ----------------- REVIEWS SECTION (NEW) -----------------

function ReviewsSection() {

  return (

    <section className="bg-[#e9e9e9] py-10 md:py-12">

      <div className="mx-auto max-w-6xl px-4">

        {/* Title */}

        <div className="text-center">

          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">

           Trackvio ব্যবহারকারীদের কথা

          </h2>

          <div className="mx-auto mt-3 h-0.5 w-12 bg-gray-400" />

        </div>

        {/* Content Box */}

        <div className="mt-2 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">

          {/* Left Google Badge */}

          <div className="flex flex-col items-center justify-center p-4 text-center">

            <span className="text-xl font-extrabold tracking-wide text-gray-900">

              GOOD

            </span>

            {/* Stars */}

            <div className="mt-2 flex items-center gap-1">

              {[...Array(4)].map((_, i) => (

                <Star

                  key={i}

                  className="h-6 w-6 fill-[#ffb400] text-[#ffb400]"

                />

              ))}

              <Star className="h-6 w-6 fill-gray-300 text-gray-300" />

            </div>

            <p className="mt-2 text-xs font-semibold text-gray-700">

              Based on <span className="font-bold">70 reviews</span>

            </p>

            {/* Google Logo */}

            <div className="mt-1 flex items-center gap-1 text-2xl font-bold tracking-tighter">

              <span className="text-[#4285F4]">G</span>

              <span className="text-[#EA4335]">o</span>

              <span className="text-[#FBBC05]">o</span>

              <span className="text-[#4285F4]">g</span>

              <span className="text-[#34A853]">l</span>

              <span className="text-[#EA4335]">e</span>

            </div>

          </div>

          {/* Right Cards Slider Wrapper */}

          <div className="relative flex w-full flex-1 items-center gap-3 overflow-hidden">

            {/* Left Slider Arrow */}

            <button

              type="button"

              className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-md text-gray-600 hover:text-gray-900"

            >

              <ChevronLeft size={18} />

            </button>

            {/* Cards Grid / Carousel */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {reviewsData.map((item) => (

                <div

                  key={item.id}

                  className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"

                >

                  <div>

                    {/* Header: User Info & Google Icon */}

                    <div className="flex items-start justify-between gap-2">

                      <div className="flex items-center gap-3">

                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">

                          <img

                            src={item.avatar}

                            alt={item.name}

                            className="h-full w-full object-cover"

                          />

                        </div>

                        <div>

                          <h4 className="text-sm font-bold text-gray-900">

                            {item.name}

                          </h4>

                          <p className="text-xs text-gray-500">{item.time}</p>

                        </div>

                      </div>

                      {/* Google G icon */}

                      <span className="text-base font-bold text-[#4285F4]">

                        G

                      </span>

                    </div>

                    {/* Stars + Verified Icon */}

                    <div className="mt-3 flex items-center gap-1">

                      {[...Array(item.rating)].map((_, i) => (

                        <Star

                          key={i}

                          className="h-4 w-4 fill-[#ffb400] text-[#ffb400]"

                        />

                      ))}

                      <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#4285F4] text-[10px] text-white font-bold">

                        ✓

                      </span>

                    </div>

                    {/* Comment */}

                    <p className="mt-3 text-xs leading-relaxed text-gray-700">

                      {item.comment}

                    </p>

                  </div>

                  {item.comment.length > 50 && (

                    <button

                      type="button"

                      className="mt-3 text-left text-xs font-medium text-gray-500 hover:underline"

                    >

                      Read more

                    </button>

                  )}

                </div>

              ))}

            </div>

            {/* Right Slider Arrow */}

            <button

              type="button"

              className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-md text-gray-600 hover:text-gray-900"

            >

              <ChevronRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}

function ComparisonSection() {

  const renderStatus = (val) => {

    if (val === true) {

      return (

        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">

          <Check className="h-5 w-5 rounded-full bg-emerald-100 p-0.5 text-emerald-600" />

          উপলব্ধ

        </span>

      );

    }

    if (val === false) {

      return (

        <span className="inline-flex items-center gap-1 text-gray-400">

          <X className="h-5 w-5 rounded-full bg-gray-100 p-0.5 text-gray-400" />

          নেই

        </span>

      );

    }

    return <span className="font-medium text-gray-700">{val}</span>;

  };

  return (

    <section className="bg-slate-50 py-10 md:py-14">

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="text-center">

          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-[#ff7912]">

            <Sparkles className="h-3.5 w-3.5" /> ফিচার তুলনা

          </span>

          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">

            প্যাকেজসমূহের বিস্তারিত পার্থক্য

          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600">

            আপনার ব্যক্তিগত বা ব্যবসায়িক চাহিদার ওপর ভিত্তি করে সেরা GPS ট্র্যাকিং প্যাকেজটি বেছে নিন।

          </p>

        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] border-collapse text-left text-sm">

              <thead>

                <tr className="border-b border-gray-200 bg-gray-50/80">

                  <th className="w-2/5 px-6 py-5 font-bold text-gray-900">

                    ট্র্যাকিং ফিচারসমূহ

                  </th>

                  <th className="px-5 py-5 text-center font-semibold text-gray-800">

                    <div className="flex items-center justify-center gap-1.5">

                      <Car className="h-4 w-4 text-orange-500" />

                      ব্যক্তিগত গাড়ি

                    </div>

                  </th>

                  <th className="bg-orange-500/10 px-5 py-5 text-center font-bold text-[#ff7912]">

                    <div className="flex items-center justify-center gap-1.5">

                      <Briefcase className="h-4 w-4 text-[#ff7912]" />

                      ব্যবসায়িক গাড়ি

                    </div>

                  </th>

                  <th className="px-5 py-5 text-center font-semibold text-gray-800">

                    <div className="flex items-center justify-center gap-1.5">

                      <Truck className="h-4 w-4 text-orange-500" />

                      ফ্লিট ম্যানেজমেন্ট

                    </div>

                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {featureComparison.map((item, idx) => {

                  const Icon = item.icon;

                  return (

                    <tr

                      key={item.name}

                      className={`transition-colors hover:bg-orange-50/30 ${

                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"

                      }`}

                    >

                      <td className="px-6 py-4 font-medium text-gray-800">

                        <div className="flex items-center gap-3">

                          <div className="rounded-lg bg-orange-100/60 p-2 text-[#ff7912]">

                            <Icon className="h-4 w-4" />

                          </div>

                          <span>{item.name}</span>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-center">

                        {renderStatus(item.basic)}

                      </td>

                      <td className="bg-orange-50/30 px-5 py-4 text-center">

                        {renderStatus(item.standard)}

                      </td>

                      <td className="px-5 py-4 text-center">

                        {renderStatus(item.enterprise)}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <a

            href="#pricing-products"

            className="inline-flex items-center gap-2 rounded-full bg-[#ff7912] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg"

          >

            প্যাকেজ ও মূল্য দেখুন

          </a>

          <a

            href={`tel:${PHONE}`}

            className="inline-flex items-center gap-2 rounded-full border border-orange-500 bg-white px-7 py-3 text-sm font-semibold text-[#ff7912] transition hover:bg-orange-50"

          >

            <Phone className="h-4 w-4" />

            বিস্তারিত জানতে কল করুন

          </a>

        </div>

      </div>

    </section>

  );

}

function FAQSection() {

  const [openFaq, setOpenFaq] = useState(0);

  return (

    <section className="bg-white pb-20 pt-5">

      <div className="mx-auto max-w-4xl px-4">

        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">

          সাধারণ জিজ্ঞাসা

        </h2>

        <div className="space-y-3">

          {questions.map((item, index) => {

            const isOpen = openFaq === index;

            return (

              <div

                key={item.q}

                className="overflow-hidden rounded-lg border border-gray-200 transition-all"

              >

                <button

                  type="button"

                  aria-expanded={isOpen}

                  onClick={() => setOpenFaq(isOpen ? -1 : index)}

                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white transition-colors ${

                    isOpen ? "bg-[#158ec9]" : "bg-[#b3469b]"

                  }`}

                >

                  <span>{item.q}</span>

                  <ChevronDown

                    size={20}

                    className={`shrink-0 transition-transform duration-200 ${

                      isOpen ? "rotate-180" : ""

                    }`}

                  />

                </button>

                {isOpen && (

                  <div className="bg-gray-50 px-5 py-5 leading-7 text-gray-700">

                    {item.a}

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

}

// Lightweight visual simulation only — never represents real customer GPS data.
const TRACKING_PREVIEWS = [
  { id: "car", name: "প্রাইভেট কার", icon: Car, label: "Private Car", status: "Tracking preview", speed: "42", location: "Demo Route A", color: "#fb923c" },
  { id: "bike", name: "মোটরসাইকেল", icon: MapPin, label: "Motorbike", status: "Tracking preview", speed: "28", location: "Demo Route B", color: "#38bdf8" },
  { id: "truck", name: "ট্রাক", icon: Truck, label: "Truck", status: "Tracking preview", speed: "35", location: "Demo Route C", color: "#34d399" },
];

function PricingVisualHero() {
  const [activeVehicle, setActiveVehicle] = useState("car");
  const [showRoute, setShowRoute] = useState(true);
  const [showGeofence, setShowGeofence] = useState(true);
  const current = TRACKING_PREVIEWS.find((v) => v.id === activeVehicle) || TRACKING_PREVIEWS[0];
  const ActiveIcon = current.icon;

  return (
    <section className="relative isolate overflow-hidden bg-[#081827] text-white">
      <style>{`
        @keyframes tv-grid-drift { to { background-position: 56px 56px; } }
        @keyframes tv-route-flow { to { stroke-dashoffset: -48; } }
        @keyframes tv-ping { 0% { transform: scale(.7); opacity:.7; } 80%,100% { transform: scale(1.65); opacity:0; } }
        @keyframes tv-float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-7px) } }
        .tv-grid { background-image:linear-gradient(rgba(125,211,252,.065) 1px,transparent 1px),linear-gradient(90deg,rgba(125,211,252,.065) 1px,transparent 1px);background-size:56px 56px;animation:tv-grid-drift 18s linear infinite; }
        .tv-route { stroke-dasharray:12 12;animation:tv-route-flow 2.8s linear infinite; }
        .tv-ping {transform-origin:center;animation:tv-ping 2.7s ease-out infinite;}
        .tv-float {animation:tv-float 5s ease-in-out infinite;}
        @media (prefers-reduced-motion: reduce) { .tv-grid,.tv-route,.tv-ping,.tv-float { animation:none !important; } }
      `}</style>
      <div aria-hidden="true" className="tv-grid absolute inset-0 pointer-events-none opacity-75" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-orange-500/15 blur-[95px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky-400/15 blur-[90px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-9 px-4 py-12 sm:px-6 md:grid-cols-[.92fr_1.08fr] md:gap-10 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-orange-200">
            <Sparkles size={14} />Trackvio GPS TRACKING
          </span>
          <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.28] tracking-tight sm:text-4xl lg:text-[43px]">
            আপনার গাড়ির নিরাপত্তায় <span className="text-[#ff922b]">স্মার্ট GPS ট্র্যাকিং</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            ট্র্যাকিং অভিজ্ঞতা কেমন হতে পারে, নিচের ইন্টারঅ্যাকটিভ প্রিভিউতে দেখুন। তারপর আপনার প্রয়োজনের প্যাকেজ বেছে নিন।
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#pricing-products" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff881b] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
              প্যাকেজ ও মূল্য দেখুন <ArrowDown size={17} />
            </a>
            <a href="#pricing-demo" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              ফ্রি ডেমো নিন <ChevronDown size={17} />
            </a>
          </div>
          <div className="mt-9 grid max-w-md grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3"><MapPin className="mb-2 text-orange-300" size={18} />লোকেশন</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3"><ShieldAlert className="mb-2 text-orange-300" size={18} />জিওফেন্স</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3"><History className="mb-2 text-orange-300" size={18} />রুট হিস্ট্রি</div>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-[24px] border border-white/15 bg-[#10283c]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,.35)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inset-0 rounded-full bg-emerald-400/50 tv-ping"/><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400"/></span>
              <span className="text-xs font-semibold text-white">GPS Tracking Preview</span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-300">INTERACTIVE DEMO • NOT LIVE</span>
          </div>
          <div className="flex flex-wrap gap-2 pb-4" aria-label="গাড়ির ধরন নির্বাচন করুন">
            {TRACKING_PREVIEWS.map((vehicle) => {
              const Icon = vehicle.icon;
              const selected = activeVehicle === vehicle.id;
              return <button key={vehicle.id} type="button" aria-pressed={selected} onClick={() => setActiveVehicle(vehicle.id)} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${selected ? "border-orange-400 bg-orange-500/20 text-orange-200" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}><Icon size={15} />{vehicle.name}</button>;
            })}
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-sky-200/10 bg-[#0c2233]">
            <div aria-hidden="true" className="tv-grid absolute inset-0 opacity-80" />
            <svg className="relative block h-auto w-full" viewBox="0 0 520 310" role="img" aria-label="কাল্পনিক GPS রুট, অবস্থান ও জিওফেন্স প্রদর্শন">
              <path d="M-10 75 Q95 60 135 130 T320 135 T535 100 M-10 250 Q110 190 240 245 T540 210" fill="none" stroke="#24506a" strokeWidth="25" opacity=".45"/>
              <path d="M70 0 L95 310 M255 0 L300 310 M420 0 L382 310" fill="none" stroke="#21465e" strokeWidth="18" opacity=".35"/>
              {showGeofence && <><circle cx="350" cy="146" r="100" fill="#fb923c" fillOpacity=".07" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="5 7"/><circle cx="350" cy="146" r="65" fill="none" stroke="#fb923c" strokeOpacity=".2"/></>}
              {showRoute && <><path d="M80 238 C125 228 138 150 208 185 S316 247 350 146 S424 89 465 96" fill="none" stroke="#fbbf24" strokeOpacity=".23" strokeWidth="12" strokeLinecap="round"/><path className="tv-route" d="M80 238 C125 228 138 150 208 185 S316 247 350 146 S424 89 465 96" fill="none" stroke="#ff9b39" strokeWidth="4" strokeLinecap="round"/></>}
              <circle cx="80" cy="238" r="8" fill="#34d399" stroke="#fff" strokeWidth="3"/>
              <circle cx="465" cy="96" r="8" fill="#38bdf8" stroke="#fff" strokeWidth="3"/>
              <g transform={activeVehicle === "bike" ? "translate(208 185)" : activeVehicle === "truck" ? "translate(465 96)" : "translate(350 146)"}>
                <circle r="31" fill={current.color} opacity=".12"/><circle r="21" fill={current.color} opacity=".2"/><circle r="12" fill={current.color} stroke="white" strokeWidth="3"/><circle r="4" fill="#fff"/>
              </g>
              <text x="24" y="34" fill="#8eb7c9" fontSize="12" fontFamily="sans-serif">SIMULATED TRACKING MAP</text>
              <text x="24" y="288" fill="#7c9db0" fontSize="12" fontFamily="sans-serif">Illustration • no actual location data</text>
            </svg>
            <div className="tv-float absolute right-3 top-12 rounded-xl border border-white/10 bg-[#081827]/90 px-3 py-2 shadow-xl backdrop-blur-md sm:right-5">
              <div className="flex items-center gap-2 text-[11px] text-slate-300"><ActiveIcon size={15} color={current.color}/>{current.label}</div>
              <div className="mt-1 text-lg font-bold text-white">{current.speed} <span className="text-xs font-medium text-slate-400">km/h</span></div>
              <p className="text-[10px] text-slate-400">Sample speed</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400">ভিজ্যুয়াল লেয়ার নির্বাচন করুন</div>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={showRoute} onClick={() => setShowRoute((v) => !v)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${showRoute ? "bg-orange-500 text-white" : "border border-white/15 text-slate-300 hover:bg-white/10"}`}>রুট {showRoute ? "ON" : "OFF"}</button>
              <button type="button" aria-pressed={showGeofence} onClick={() => setShowGeofence((v) => !v)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${showGeofence ? "bg-sky-500 text-white" : "border border-white/15 text-slate-300 hover:bg-white/10"}`}>জিওফেন্স {showGeofence ? "ON" : "OFF"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <main className="w-full overflow-x-hidden font-sans text-gray-800">
      <PricingVisualHero />
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ecf5f8] via-[#f8fbff] to-white py-8 md:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#93aebc 0.65px, transparent 0.65px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_55px_rgba(28,64,91,.09)]">
            <img src={BANNER} alt="trackvd GPS tracking package banner" className="block h-auto w-full rounded-xl object-contain" />
          </div>
          <div className="mt-9 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700"><Sparkles size={14}/> Choose your tracking plan</span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">আপনার প্রয়োজন অনুযায়ী GPS ট্র্যাকিং প্যাকেজ দেখুন</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">প্যাকেজের মূল্য, মাসিক চার্জ ও ফিচার দেখে আপনার জন্য উপযুক্ত GPS ট্র্যাকার নির্বাচন করুন।</p>
          </div>
          <div id="pricing-products" className="scroll-mt-24 pt-7"><PopularProduct /></div>
        </div>
      </section>
      <DemoSection />
      <ReviewsSection />
      <ComparisonSection />
      <FAQSection />
    </main>
  );
}
