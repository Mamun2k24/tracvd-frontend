import React, { useCallback, useEffect, useState } from "react";
import { RefreshCw, Search, CheckCircle2, XCircle, Wallet } from "lucide-react";
const API = (import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000").replace(/\/+$/, "");
const defaultSettings = { enabled: false, bkashNumber: "", accountType: "personal", instructions: "প্রদর্শিত bKash নম্বরে পেমেন্ট করে Transaction ID দিন। Admin যাচাইয়ের পর Confirm হবে।" };
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("Admin login required");
  const response = await fetch(`${API}/api/monthly-payments/admin${url}`, { ...options, headers: { Authorization: `Bearer ${token}`, ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers } });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.message || "Request failed");
  return json;
};
const input = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
export default function MonthlyPaymentsDashboard() {
  const [data, setData] = useState({ items: [], counts: {}, page: 1, pages: 0, total: 0 });
  const [settings, setSettings] = useState(defaultSettings);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [decision, setDecision] = useState("approved");
  const [note, setNote] = useState("");
  const [verifiedAmount, setVerifiedAmount] = useState("");
  const [statementChecked, setStatementChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const reload = useCallback(async () => {
    try { const params = new URLSearchParams({ page: String(page), ...(filter !== "all" ? { status: filter } : {}), ...(query ? { search: query } : {}) }); setData(await authFetch(`/requests?${params}`)); }
    catch (e) { setError(e.message); }
  }, [filter, page, query]);
  useEffect(() => { reload(); }, [reload]);
  useEffect(() => { authFetch("/settings").then(s => setSettings({ ...defaultSettings, ...s })).catch(e => setError(e.message)); }, []);
  const saveSettings = async (e) => {
    e.preventDefault(); setBusy(true); setError(""); setNotice("");
    try { const r = await authFetch("/settings", { method: "PATCH", body: JSON.stringify({ enabled: settings.enabled, bkashNumber: settings.bkashNumber, accountType: settings.accountType, instructions: settings.instructions }) }); setSettings({ ...defaultSettings, ...r.settings }); setNotice("Payment Settings saved"); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const openReview = (item, action) => { setSelected(item); setDecision(action); setNote(""); setVerifiedAmount(String(item.submittedAmount)); setStatementChecked(false); setError(""); };
  const review = async (e) => {
    e.preventDefault(); if (!selected) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await authFetch(`/requests/${selected._id}/review`, { method: "PATCH", body: JSON.stringify({ status: decision, adminNote: note, verifiedAmount: Number(verifiedAmount), statementChecked }) });
      setSelected(null); setNotice(`Request ${decision}`); await reload();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const statusClass = { pending: "bg-amber-50 text-amber-800", approved: "bg-green-50 text-green-700", rejected: "bg-red-50 text-red-700" };
  return <div className="min-h-screen bg-slate-50 p-3 sm:p-6">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-extrabold text-slate-900">Monthly Payments</h1><p className="mt-1 text-sm text-slate-500">Manual bKash requests • Confirm only after verifying statement and billing amount</p></div><button onClick={reload} className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold"><RefreshCw size={16}/> Refresh</button></div>
    {error && <div role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
    {notice && <div role="status" className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{notice}</div>}
    <div className="mb-6 grid grid-cols-3 gap-3">{["pending", "approved", "rejected"].map(s => <div key={s} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><p className="text-xs capitalize text-slate-500">{s}</p><p className="mt-2 text-2xl font-black text-slate-900">{data.counts?.[s] || 0}</p></div>)}</div>
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><Wallet className="text-blue-600" size={19}/><h2 className="font-bold text-slate-900">Payment Settings</h2></div>
      <form onSubmit={saveSettings} className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold">bKash Payment Number<input className={`${input} mt-1`} placeholder="01XXXXXXXXX" value={settings.bkashNumber} onChange={e => setSettings(p => ({ ...p, bkashNumber: e.target.value }))}/></label><label className="text-sm font-semibold">Account Type<select className={`${input} mt-1`} value={settings.accountType} onChange={e => setSettings(p => ({ ...p, accountType: e.target.value }))}><option value="personal">Personal</option><option value="merchant">Merchant</option><option value="agent">Agent</option></select></label><label className="text-sm font-semibold sm:col-span-2">Customer Instructions<textarea rows={2} className={`${input} mt-1`} maxLength={500} value={settings.instructions} onChange={e => setSettings(p => ({ ...p, instructions: e.target.value }))}/></label><div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.enabled} onChange={e => setSettings(p => ({ ...p, enabled: e.target.checked }))}/> Allow manual payment requests</label><button disabled={busy} className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-50">Save Settings</button></div></form>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="font-bold text-slate-900">Payment Requests</h2><div className="flex flex-wrap gap-2"><select value={filter} onChange={e => { setPage(1); setFilter(e.target.value); }} className={input}><option value="all">All</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select><form onSubmit={e => { e.preventDefault(); setPage(1); setQuery(search.trim()); }} className="flex gap-2"><input className={input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Name / Phone / TrxID"/><button aria-label="Search" className="rounded-lg bg-slate-900 px-3 text-white"><Search size={17}/></button></form></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Customer / Phone", "Vehicle / Order", "Billing Month", "Amount", "bKash Sender", "TrxID", "Status", "Actions"].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{data.items.map(r => <tr key={r._id} className="border-t border-slate-100"><td className="p-3"><strong>{r.customerName}</strong><div className="text-xs text-slate-500">{r.customerPhone}</div></td><td className="p-3">{r.vehicleNumber}<div className="text-xs text-slate-500">{r.orderReference || "No order ref"}</div></td><td className="p-3">{r.billingMonth}</td><td className="p-3 font-bold">৳{r.submittedAmount}</td><td className="p-3">{r.senderNumber}</td><td className="p-3 font-mono text-xs">{r.transactionId}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass[r.status]}`}>{r.status}</span></td><td className="p-3">{r.status === "pending" ? <div className="flex gap-2"><button onClick={() => openReview(r,"approved")} className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">Approve</button><button onClick={() => openReview(r,"rejected")} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Reject</button></div> : <div className="text-xs text-slate-500">{r.adminNote || "Reviewed"}<div>{r.verifiedAmount != null ? `Verified ৳${r.verifiedAmount}` : ""}</div></div>}</td></tr>)}</tbody></table>{data.items.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No requests found</p>}</div>
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-500"><span>Total: {data.total}</span><div className="flex items-center gap-2"><button className="rounded-lg border px-3 py-2 disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button><span>{page} / {Math.max(1, data.pages)}</span><button className="rounded-lg border px-3 py-2 disabled:opacity-40" disabled={page >= data.pages} onClick={() => setPage(p => p + 1)}>Next</button></div></div>
    </section>
    {selected && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4"><form onSubmit={review} role="dialog" aria-modal="true" className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center gap-2">{decision === "approved" ? <CheckCircle2 className="text-green-600"/> : <XCircle className="text-red-600"/>}<h3 className="text-lg font-bold capitalize">{decision} Payment Request</h3></div><div className="rounded-xl bg-slate-50 p-3 text-sm"><strong>{selected.customerName}</strong> — ৳{selected.submittedAmount}<br/>TrxID: {selected.transactionId}<br/>Billing Month: {selected.billingMonth}<br/>Vehicle: {selected.vehicleNumber}</div>
      {decision === "approved" && <><label className="block text-sm font-semibold">Statement-verified Amount (৳)<input required className={`${input} mt-1`} type="number" min="1" max="1000000" step="1" value={verifiedAmount} onChange={e => setVerifiedAmount(e.target.value)}/></label><label className="flex gap-2 text-sm"><input type="checkbox" required checked={statementChecked} onChange={e => setStatementChecked(e.target.checked)}/> আমি bKash Statement, TrxID, Amount ও Customer-এর প্রাপ্য মাসিক চার্জ যাচাই করেছি।</label></>}
      <label className="block text-sm font-semibold">Admin Note {decision === "rejected" ? "*" : "(Optional)"}<textarea required={decision === "rejected"} maxLength={1000} className={`${input} mt-1`} rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Verification details / rejection reason"/></label><p className="text-xs text-slate-500">Approve করলে এই payment request verified হবে; এটি স্বয়ংক্রিয়ভাবে GPS service activate বা order balance update করবে না।</p><div className="flex gap-2"><button disabled={busy} className={`flex-1 rounded-xl px-4 py-3 font-bold text-white disabled:opacity-50 ${decision === "approved" ? "bg-green-600" : "bg-red-600"}`}>{busy ? "Saving..." : `Confirm ${decision}`}</button><button type="button" onClick={() => setSelected(null)} className="rounded-xl border px-4 py-3">Cancel</button></div></form></div>}
  </div>;
}
