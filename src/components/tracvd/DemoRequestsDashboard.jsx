import React, { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Phone,
  ClipboardList,
  Clock3,
  CalendarCheck2,
  CheckCircle2,
  Settings,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BASE = (
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000"
).replace(/\/$/, "");
const STATUSES = [
  "pending",
  "contacted",
  "scheduled",
  "completed",
  "converted",
  "no_response",
  "cancelled",
];
const STATUS_LABELS = {
  pending: "Pending",
  contacted: "Contacted",
  scheduled: "Scheduled",
  completed: "Completed",
  converted: "Converted to Sale",
  no_response: "No Response",
  cancelled: "Cancelled",
};
const DEFAULT_SETTINGS = {
  enabled: true,
  title: "ফর্মটি পূরণ করে, Trackvd GPS ট্র্যাকারের ডেমো দেখুন!",
  successMessage: "আপনার ডেমো রিকোয়েস্ট গ্রহণ করা হয়েছে। আমরা যোগাযোগ করব।",
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
const fmtDate = (v) =>
  v
    ? new Date(v).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
      })
    : "—";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400";

async function api(path, { method = "GET", body } = {}) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("Admin login required");
  const response = await fetch(`${BASE}/api/demo/admin/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || `Request failed (${response.status})`);
  return data;
}

export default function DemoRequestsDashboard() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [qInput, setQInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const [settings, setSettings] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const limit = 15;

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (status) params.set("status", status);
      if (search) params.set("q", search);
      const data = await api(`requests?${params}`);
      setItems(data.items || []);
      setSummary(data.summary || {});
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, [page, status, search]);
  const openItem = async (item) => {
    setError("");
    try {
      setSelected(await api(`requests/${item._id}`));
    } catch (e) {
      setError(e.message);
    }
  };
  const saveItem = async () => {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      await api(`requests/${selected._id}`, {
        method: "PATCH",
        body: {
          status: selected.status,
          notes: selected.notes || "",
          demoAt: selected.demoAt || null,
        },
      });
      setSelected(null);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  const openSettings = async () => {
    setError("");
    try {
      const data = await api("settings");
      setSettings({ ...DEFAULT_SETTINGS, ...data });
      setSettingsOpen(true);
    } catch (e) {
      setError(e.message);
    }
  };
  const saveSettings = async () => {
    setBusy(true);
    setError("");
    try {
      await api("settings", {
        method: "PATCH",
        body: {
          enabled: settings.enabled,
          title: settings.title,
          successMessage: settings.successMessage,
          trialImage: settings.trialImage,
          creativeImage: settings.creativeImage,
          vehicleTypes: settings.vehicleTypes,
        },
      });
      setSettingsOpen(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  const stats = [
    {
      label: "Total Requests",
      value: Object.values(summary).reduce((a, b) => a + Number(b || 0), 0),
      icon: ClipboardList,
    },
    { label: "Pending", value: summary.pending || 0, icon: Clock3 },
    { label: "Completed", value: summary.completed || 0, icon: CalendarCheck2 },
    {
      label: "Converted to Sale",
      value: summary.converted || 0,
      icon: CheckCircle2,
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 md:px-2">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Trackvd GPS • Admin
            </p>
            <h1 className="mt-1 text-2xl font-extrabold">Free Demo Requests</h1>
            <p className="text-sm text-slate-500">
              Manage customer demo leads and follow-ups.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm"
            >
              <RefreshCw size={16} /> Refresh
            </button>
            <button
              onClick={openSettings}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Settings size={16} /> Form Settings
            </button>
          </div>
        </header>
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <Icon className="text-orange-500" size={22} />
              <div className="mt-3 text-2xl font-black">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-wrap gap-3 border-b p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPage(1);
                setSearch(qInput.trim());
              }}
              className="flex min-w-[200px] flex-1 gap-2"
            >
              <input
                aria-label="Search name, phone or vehicle"
                placeholder="Search name, phone or vehicle..."
                className={inputClass}
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
              />
              <button
                title="Search"
                type="submit"
                className="rounded-xl bg-slate-900 px-4 text-white"
              >
                <Search size={17} />
              </button>
            </form>
            <select
              aria-label="Filter status"
              className={inputClass + " max-w-[210px]"}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  {[
                    "Customer",
                    "Phone",
                    "Vehicle",
                    "Requested",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="p-6 text-center" colSpan={6}>
                      Loading requests...
                    </td>
                  </tr>
                ) : items.length ? (
                  items.map((item) => (
                    <tr key={item._id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-semibold">{item.name}</td>
                      <td className="px-4 py-3">
                        <a className="text-blue-600" href={`tel:${item.phone}`}>
                          {item.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">{item.vehicle}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {fmtDate(item.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
                          {STATUS_LABELS[item.status] || item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="font-semibold text-orange-600 hover:underline"
                          onClick={() => openItem(item)}
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No demo requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
            <span className="text-slate-500">{total} matching requests</span>
            <div className="flex items-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              Page {page} / {Math.max(1, Math.ceil(total / limit))}
              <button
                disabled={page * limit >= total}
                onClick={() => setPage((p) => p + 1)}
                className="disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Manage demo request"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <p className="text-sm text-slate-500">
                  {selected.vehicle} • {fmtDate(selected.createdAt)}
                </p>
              </div>
              <button aria-label="Close" onClick={() => setSelected(null)}>
                <X />
              </button>
            </div>
            <a
              href={`tel:${selected.phone}`}
              className="mb-5 flex items-center gap-2 font-semibold text-blue-600"
            >
              <Phone size={17} />
              {selected.phone}
            </a>
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Status
                <select
                  className={inputClass + " mt-1"}
                  value={selected.status}
                  onChange={(e) =>
                    setSelected({ ...selected, status: e.target.value })
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Demo scheduled (Bangladesh time)
                <input
                  type="datetime-local"
                  className={inputClass + " mt-1"}
                  value={
                    selected.demoAt
                      ? new Date(
                          new Date(selected.demoAt).getTime() + 6 * 3600000,
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      demoAt: e.target.value
                        ? new Date(`${e.target.value}:00+06:00`).toISOString()
                        : null,
                    })
                  }
                />
              </label>
              <label className="block text-sm font-medium">
                Internal Notes
                <textarea
                  rows={4}
                  maxLength={3000}
                  className={inputClass + " mt-1"}
                  value={selected.notes || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, notes: e.target.value })
                  }
                />
              </label>
              <button
                disabled={busy}
                onClick={saveItem}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 p-3 font-semibold text-white disabled:opacity-50"
              >
                <Save size={17} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {settingsOpen && settings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Demo form settings"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Demo Form Settings</h2>
              <button aria-label="Close" onClick={() => setSettingsOpen(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) =>
                    setSettings({ ...settings, enabled: e.target.checked })
                  }
                />{" "}
                Enable public demo form
              </label>
              {[
                ["title", "Form Title"],
                ["successMessage", "Success Message"],
                ["trialImage", "Trial Image URL"],
                ["creativeImage", "Promotional Image URL"],
              ].map(([key, label]) => (
                <label key={key} className="block text-sm font-medium">
                  {label}
                  <input
                    className={inputClass + " mt-1"}
                    value={settings[key] || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, [key]: e.target.value })
                    }
                  />
                </label>
              ))}
              <label className="block text-sm font-medium">
                Vehicle types (one per line)
                <textarea
                  rows={6}
                  className={inputClass + " mt-1"}
                  value={settings.vehicleTypes.join("\n")}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      vehicleTypes: e.target.value.split("\n"),
                    })
                  }
                />
              </label>
              <button
                disabled={busy}
                onClick={saveSettings}
                className="flex w-full justify-center gap-2 rounded-xl bg-orange-500 p-3 font-semibold text-white disabled:opacity-50"
              >
                <Save size={17} /> Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
