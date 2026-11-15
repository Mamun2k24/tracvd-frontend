import React, { useEffect, useState } from "react";
import { CreditCard, Copy, CheckCircle2, ShieldCheck, LoaderCircle } from "lucide-react";

const API = (import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000").replace(/\/+$/, "");
const initial = { customerName: "", customerPhone: "", vehicleNumber: "", orderReference: "", billingMonth: new Date().toISOString().slice(0, 7), submittedAmount: "", senderNumber: "", transactionId: "", website: "" };
export default function MonthlyPayment() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${API}/api/monthly-payments/settings`).then(async r => { if (!r.ok) throw new Error("Payment settings load failed"); return r.json(); }).then(data => { if (alive) setSettings(data); }).catch(() => { if (alive) setSettings({ enabled: false, error: true }); });
    return () => { alive = false; };
  }, []);
  const update = (event) => setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  const copyNumber = async () => {
    try { await navigator.clipboard.writeText(settings.bkashNumber); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setError("নম্বর কপি করা যায়নি। ম্যানুয়ালি কপি করুন।"); }
  };
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/api/monthly-payments/requests`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, submittedAmount: Number(form.submittedAmount) }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "Payment request failed");
      setResult(json); setForm(initial);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  const input = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  return <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50 px-4 py-12 font-sans">
    <div className="mx-auto max-w-3xl">
      <div className="mb-7 rounded-3xl bg-[#0B1730] px-6 py-9 text-white shadow-xl sm:px-9">
        <div className="mb-3 flex items-center gap-2 text-cyan-200"><CreditCard size={20}/><span className="text-xs font-bold uppercase tracking-[0.18em]">Trackvd • Monthly Billing</span></div>
        <h1 className="text-2xl font-extrabold sm:text-4xl">GPS মাসিক বিল পরিশোধ</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">bKash-এ পেমেন্ট করে Transaction ID জমা দিন। Admin যাচাইয়ের পর আপনার Request অনুমোদিত হবে।</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-cyan-100"><ShieldCheck size={15}/> Transaction ID জমা দেওয়া মানেই Bill Paid নয়</div>
      </div>
      {settings === null ? <div className="rounded-2xl bg-white p-9 text-center text-slate-500">Payment Information লোড হচ্ছে...</div> : !settings.enabled ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-700">এখন Manual Monthly Payment চালু নেই। অনুগ্রহ করে Support-এর সঙ্গে যোগাযোগ করুন।</div> : result ? <div className="rounded-3xl border border-emerald-100 bg-white p-9 text-center shadow-sm">
        <CheckCircle2 size={52} className="mx-auto text-emerald-600"/><h2 className="mt-4 text-2xl font-bold text-slate-900">Request সফলভাবে জমা হয়েছে</h2>
        <p className="mt-3 text-sm text-slate-600">Payment Status: <strong className="text-amber-700">Pending Verification</strong></p>
        <p className="mt-4 break-all rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-700">Receipt ID: {result.receiptId}</p>
        <p className="mt-3 text-xs text-slate-500">Receipt ID সংরক্ষণ করুন। Admin bKash Transaction যাচাই করবে।</p>
        <button onClick={() => setResult(null)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">আরেকটি Request জমা দিন</button>
      </div> : <div className="space-y-5">
        <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-bold text-slate-900">1. bKash Payment Information</h2><span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700">bKash</span></div>
          <div className="rounded-2xl bg-[#FFF2F7] p-5">
            <p className="text-xs font-semibold text-pink-700">Payment Number ({settings.accountType})</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3"><span className="text-2xl font-black tracking-wide text-pink-800">{settings.bkashNumber}</span><button type="button" onClick={copyNumber} className="flex items-center gap-2 rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm font-semibold text-pink-700"><Copy size={15}/>{copied ? "Copied" : "Copy"}</button></div>
            <p className="mt-3 text-sm leading-6 text-pink-900">{settings.instructions || "বিল পরিশোধ করে নিচের ফর্মে সঠিক Transaction ID দিন।"}</p>
          </div>
        </section>
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-5 text-lg font-bold text-slate-900">2. Payment Details জমা দিন</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Customer Name *<input className={input} name="customerName" value={form.customerName} onChange={update} maxLength={100} required placeholder="আপনার নাম"/></label>
            <label className="text-sm font-semibold text-slate-700">Customer Mobile *<input className={input} name="customerPhone" type="tel" inputMode="numeric" pattern="01[3-9][0-9]{8}" value={form.customerPhone} onChange={update} required placeholder="01XXXXXXXXX"/></label>
            <label className="text-sm font-semibold text-slate-700">Vehicle Number / GPS ID *<input className={input} name="vehicleNumber" value={form.vehicleNumber} onChange={update} maxLength={80} required placeholder="DHA METRO / GPS Device ID"/></label>
            <label className="text-sm font-semibold text-slate-700">Order Reference (Optional)<input className={input} name="orderReference" value={form.orderReference} onChange={update} maxLength={100} placeholder="Order ID"/></label>
            <label className="text-sm font-semibold text-slate-700">Billing Month *<input className={input} name="billingMonth" type="month" max={new Date().toISOString().slice(0, 7)} value={form.billingMonth} onChange={update} required/></label>
            <label className="text-sm font-semibold text-slate-700">Paid Amount (৳) *<input className={input} name="submittedAmount" type="number" min="1" max="1000000" step="1" value={form.submittedAmount} onChange={update} required placeholder="যেমন 250"/></label>
            <label className="text-sm font-semibold text-slate-700">bKash Sender Number *<input className={input} name="senderNumber" type="tel" inputMode="numeric" pattern="01[3-9][0-9]{8}" value={form.senderNumber} onChange={update} required placeholder="যে নম্বর থেকে পাঠিয়েছেন"/></label>
            <label className="text-sm font-semibold text-slate-700">Transaction ID (TrxID) *<input className={input} name="transactionId" minLength={5} maxLength={80} value={form.transactionId} onChange={update} required placeholder="bKash Transaction ID"/></label>
          </div>
          <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update}/></label></div>
          <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-xs leading-6 text-blue-900">Amount ও Transaction ID Admin যাচাই করবেন। শুধু ফর্ম জমা দেওয়ার মাধ্যমে Bill Paid হবে না।</p>
          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60">{loading && <LoaderCircle className="animate-spin" size={18}/>} {loading ? "Submitting..." : "Submit Payment Request"}</button>
        </form>
      </div>}
    </div>
  </main>;
}
