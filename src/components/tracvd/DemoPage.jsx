import React, { useEffect, useState } from "react";

const API_BASE = (
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000"
).replace(/\/$/, "");
const DEFAULTS = {
  enabled: true,
  title: "ফর্মটি পূরণ করে, Trackvd GPS ট্র্যাকারের ডেমো দেখুন!",
  trialImage: "https://prohori.com/wp-content/uploads/2026/05/free-trial.gif",
  creativeImage:
    "https://prohori.com/wp-content/uploads/2026/07/Demo-page-creative.webp",
  vehicleTypes: [
    "প্রাইভেট কার",
    "মোটরসাইকেল",
    "মাইক্রোবাস",
    "বাস",
    "ট্রাক",
    "পিকআপ",
    "অন্যান্য",
  ],
};

export default function DemoPage() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    website: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/demo/settings`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load settings");
        return r.json();
      })
      .then((data) => setSettings({ ...DEFAULTS, ...data }))
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });
    return () => controller.abort();
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setMessage("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    if (!form.name.trim() || !/^01[3-9]\d{8}$/.test(form.phone.trim())) {
      setSuccess(false);
      setMessage("সঠিক নাম ও ১১ সংখ্যার মোবাইল নম্বর দিন।");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const r = await fetch(`${API_BASE}/api/demo/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          vehicle: form.vehicle,
          website: form.website,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.message || "রিকোয়েস্ট পাঠানো যায়নি।");
      setSuccess(true);
      setMessage(data.message || "রিকোয়েস্ট গ্রহণ করা হয়েছে।");
      setForm({ name: "", phone: "", vehicle: "", website: "" });
    } catch (e) {
      setSuccess(false);
      setMessage(e.message || "Network error. আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#e7e7e7] px-4 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto grid w-full max-w-[730px] grid-cols-1 items-stretch gap-7 md:grid-cols-2">
        <section className="overflow-hidden rounded-[9px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <div className="flex min-h-[96px] items-center justify-between gap-3 bg-[#ff881b] px-5 py-3 text-white">
            <h1 className="max-w-[195px] text-[18px] font-semibold leading-[1.5]">
              {settings.title}
            </h1>
            <img
              src={settings.trialImage}
              alt="Free trial"
              className="h-[75px] w-[80px] shrink-0 object-contain"
            />
          </div>
          {settings.enabled ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 px-7 pb-10 pt-8 sm:px-8"
            >
              <label className="sr-only" htmlFor="demo-name">
                আপনার নাম
              </label>
              <input
                id="demo-name"
                name="name"
                value={form.name}
                onChange={update}
                required
                maxLength={100}
                placeholder="আপনার নাম"
                className="h-12 w-full rounded-[6px] border border-[#333] bg-white px-3 text-[14px] text-gray-900 outline-none focus:border-[#ff881b] focus:ring-2 focus:ring-orange-100"
              />
              <label className="sr-only" htmlFor="demo-phone">
                মোবাইল নম্বর
              </label>
              <input
                id="demo-phone"
                name="phone"
                value={form.phone}
                onChange={update}
                required
                maxLength={11}
                inputMode="numeric"
                type="tel"
                placeholder="মোবাইল নম্বর"
                className="h-12 w-full rounded-[6px] border border-[#333] bg-white px-3 text-[14px] text-gray-900 outline-none focus:border-[#ff881b] focus:ring-2 focus:ring-orange-100"
              />
              <label className="sr-only" htmlFor="demo-vehicle">
                গাড়ির ধরন
              </label>
              <select
                id="demo-vehicle"
                name="vehicle"
                value={form.vehicle}
                onChange={update}
                required
                className="h-12 w-full rounded-[6px] border border-[#333] bg-white px-3 text-[14px] text-gray-900 outline-none focus:border-[#ff881b] focus:ring-2 focus:ring-orange-100"
              >
                <option value="" disabled>
                  গাড়ির ধরন
                </option>
                {settings.vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div
                aria-hidden="true"
                className="absolute -left-[9999px]"
                style={{ position: "absolute", left: "-9999px" }}
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.website}
                  onChange={update}
                />
              </div>
              <p className="text-center text-xs text-gray-500">
                আপনার তথ্য শুধু ডেমোর বিষয়ে যোগাযোগ করতে ব্যবহার করা হবে।
              </p>
              {message && (
                <p
                  role="status"
                  className={`text-center text-sm ${success ? "text-green-700" : "text-red-700"}`}
                >
                  {message}
                </p>
              )}
              <button
                disabled={loading}
                type="submit"
                className="mx-auto mt-2 rounded-md bg-[#ff881b] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#ed7410] disabled:opacity-60"
              >
                {loading ? "পাঠানো হচ্ছে..." : "ডেমো রিকোয়েস্ট করুন"}
              </button>
            </form>
          ) : (
            <p className="p-8 text-center text-gray-700">
              ডেমো রিকোয়েস্ট সাময়িকভাবে বন্ধ আছে।
            </p>
          )}
        </section>
        <aside className="flex items-center justify-center overflow-hidden rounded-[9px] bg-[#f5f5f5] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <img
            src={settings.creativeImage}
            alt="GPS tracking demo promotional illustration"
            className="h-full max-h-[510px] w-full object-contain"
            loading="eager"
          />
        </aside>
      </div>
    </main>
  );
}
