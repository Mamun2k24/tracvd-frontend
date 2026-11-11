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
  "https://prohori.com/wp-content/uploads/2026/09/prohori-gps-tracker-server-banner.webp";

const TRACKING_IMAGE =
  "https://i.ibb.co.com/DP5nSK7f/tracvd.png";

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
    a: "চার্জ নির্দিষ্ট ডিভাইস ও সার্ভিস প্যাকেজের ওপর নির্ভর করে। বিস্তারিত জানতে Trackvd টিমের সঙ্গে যোগাযোগ করুন।",
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
    name: "২৪/৭ কাস্টমার সাপোর্ট ও এসি ট্র্যাকিং",
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
  const [title, setTitle] = useState("ফর্মটি পূরণ করে Trackvd GPS ট্র্যাকারের ডেমো দেখুন!");
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
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-center text-center md:pt-7">
          <h2 className="max-w-[490px] text-xl font-semibold leading-relaxed text-gray-900 md:text-2xl">
            Trackvd GPS Tracker কিভাবে কাজ করে তার ডেমো দেখতে ফর্মটি পূরণ করুন
          </h2>

          <img
            src={TRACKING_IMAGE}
            alt="Trackvd GPS live vehicle tracking demonstration"
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
    <section className="bg-[#e9e9e9] py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            Trackvd ব্যবহারকারীদের কথা
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 bg-gray-400" />
        </div>

        {/* Content Box */}
        <div className="mt-10 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          
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
    <section className="bg-slate-50 py-16 md:py-24">
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
    <section className="bg-white pb-20 pt-10">
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

export default function PricingPage() {
  return (
    <main className="w-full overflow-x-hidden font-sans text-gray-800">
      <section className="bg-[#e8e8e8] py-6 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-md bg-white shadow-sm">
            <img
              src={BANNER}
              alt="Trackvd GPS tracking package banner"
              className="block h-auto w-full object-contain"
            />
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold md:text-2xl">
              আপনার প্রয়োজন অনুযায়ী GPS ট্র্যাকিং প্যাকেজ দেখুন
            </h2>

            <a
              href="#pricing-products"
              aria-label="প্যাকেজ দেখুন"
              className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#ff7912] text-white shadow-md transition hover:bg-orange-600"
            >
              <ArrowDown size={22} />
            </a>
          </div>

          <div id="pricing-products" className="scroll-mt-14 pt-8">
            <PopularProduct />
          </div>
        </div>
      </section>

      <DemoSection />

      {/* Customer Google Reviews Section */}
      <ReviewsSection />

      <ComparisonSection />

      <FAQSection />
    </main>
  );
}