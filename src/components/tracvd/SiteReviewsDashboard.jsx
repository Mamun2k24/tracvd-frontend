
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Star,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

const BASE = (
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000"
).replace(/\/$/, "");

const empty = {
  name: "",
  comment: "",
  rating: 5,
  avatar: "",
  source: "website",
  sourceUrl: "",
  reviewDate: new Date().toISOString().slice(0, 10),
  verified: false,
  published: true,
  sortOrder: 0,
};

export default function SiteReviewsDashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // =========================
  // API REQUEST
  // =========================
  const request = async (path, options = {}) => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) throw new Error("Admin login required");

    const response = await fetch(
      `${BASE}/api/site-reviews/admin${path}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  };

  // =========================
  // LOAD REVIEWS
  // =========================
  const reload = async () => {
    setError("");

    try {
      const data = await request("?limit=50");
      setItems(data.items || []);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  // =========================
  // ADD / EDIT
  // =========================
  const startAdd = () => {
    setForm({
      ...empty,
      reviewDate: new Date().toISOString().slice(0, 10),
    });

    setEditingId(null);
    setOpen(true);
    setError("");
  };

  const startEdit = (item) => {
    setForm({
      name: item.name || "",
      comment: item.comment || "",
      rating: item.rating || 5,
      avatar: item.avatar || "",
      source: item.source || "website",
      sourceUrl: item.sourceUrl || "",
      reviewDate: item.reviewDate
        ? item.reviewDate.slice(0, 10)
        : "",
      verified: Boolean(item.verified),
      published: Boolean(item.published),
      sortOrder: item.sortOrder || 0,
    });

    setEditingId(item._id);
    setOpen(true);
    setError("");
  };

  // =========================
  // IMAGE UPLOAD (ImgBB)
  // =========================
  const uploadAvatar = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, WebP or GIF images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      return;
    }

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    if (!apiKey) {
      setError(
        "Image upload is not configured. Add VITE_IMGBB_API_KEY to frontend .env."
      );
      return;
    }

    setUploading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json().catch(() => ({}));
      const url = data?.data?.url;

      if (!response.ok || !data?.success || !url) {
        throw new Error(
          data?.error?.message || "Image upload failed"
        );
      }

      setForm((prev) => ({
        ...prev,
        avatar: url,
      }));

      setNotice(
        "Profile photo uploaded. Save Review to store the image."
      );
    } catch (err) {
      setError(err.message || "Could not upload image.");
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const change = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // SAVE REVIEW
  // =========================
  const save = async (e) => {
    e.preventDefault();

    if (uploading || busy) return;

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...form,
        rating: Number(form.rating),
        sortOrder: Number(form.sortOrder),
      };

      await request(editingId ? `/${editingId}` : "", {
        method: editingId ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });

      setOpen(false);
      setNotice(editingId ? "Review updated" : "Review added");

      await reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // =========================
  // DELETE REVIEW
  // =========================
  const remove = async (id) => {
    if (!window.confirm("Delete this review permanently?")) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      await request(`/${id}`, { method: "DELETE" });
      setNotice("Review deleted");
      await reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // =========================
  // PUBLISH / UNPUBLISH
  // =========================
  const toggle = async (item) => {
    setBusy(true);
    setError("");

    try {
      await request(`/${item._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          published: !item.published,
        }),
      });

      await reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 md:px-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Website Reviews
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage public testimonials displayed on the Pricing page.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={reload}
            className="rounded-xl border bg-white p-2.5"
            aria-label="Refresh"
          >
            <RefreshCw size={18} />
          </button>

          <button
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Review
          </button>
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className="mb-3 rounded-xl bg-green-50 p-3 text-sm text-green-700"
        >
          {notice}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {/* REVIEWS TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">Reviewer</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Comment</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="border-t border-slate-100"
              >
                <td className="p-4 font-semibold">
                  {item.name}
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-blue-600">
                    <Star size={15} fill="currentColor" />
                    {item.rating}/5
                  </span>
                </td>

                <td
                  className="max-w-[260px] truncate p-4 text-slate-600"
                  title={item.comment}
                >
                  {item.comment}
                </td>

                <td className="p-4 capitalize">
                  {item.source}
                </td>

                <td className="p-4">
                  <button
                    disabled={busy}
                    onClick={() => toggle(item)}
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.published
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.published ? "Published" : "Hidden"}
                  </button>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      aria-label="Edit"
                      onClick={() => startEdit(item)}
                      className="rounded-lg bg-blue-50 p-2 text-blue-700"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      disabled={busy}
                      aria-label="Delete"
                      onClick={() => remove(item._id)}
                      className="rounded-lg bg-red-50 p-2 text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!items.length && (
          <p className="p-8 text-center text-sm text-slate-500">
            No reviews yet. Click Add Review to start.
          </p>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget &&
              !busy &&
              !uploading
            ) {
              setOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={editingId ? "Edit review" : "Add review"}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Review" : "Add Review"}
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-500"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={save}
              className="grid gap-4 sm:grid-cols-2"
            >
              {/* NAME */}
              <label className="text-sm font-medium">
                Reviewer Name
                <input
                  required
                  maxLength={100}
                  name="name"
                  value={form.name}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                />
              </label>

              {/* RATING */}
              <label className="text-sm font-medium">
                Rating
                <select
                  name="rating"
                  value={form.rating}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} Stars
                    </option>
                  ))}
                </select>
              </label>

              {/* COMMENT */}
              <label className="sm:col-span-2 text-sm font-medium">
                Review Comment
                <textarea
                  required
                  maxLength={2000}
                  rows={4}
                  name="comment"
                  value={form.comment}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                />
              </label>

              {/* PROFILE PHOTO */}
              <div className="sm:col-span-2 space-y-3">
                <p className="text-sm font-semibold text-slate-800">
                  Reviewer Profile Photo (Optional)
                </p>

                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center">
                  {/* PREVIEW */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-400">
                    {form.avatar ? (
                      <img
                        src={form.avatar}
                        alt="Reviewer photo preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={25} />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* UPLOAD BUTTON */}
                    <label
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 ${
                        uploading
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                    >
                      <UploadCloud size={17} />
                      {uploading
                        ? "Uploading photo..."
                        : "Upload from Computer"}

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={uploadAvatar}
                        disabled={uploading || busy}
                        className="sr-only"
                      />
                    </label>

                    <p className="text-xs text-slate-500">
                      JPG, PNG, WebP or GIF · Max 5 MB.
                    </p>
                  </div>
                </div>

                {/* IMAGE URL */}
                <label className="block text-sm font-medium">
                  Or Paste Image URL
                  <input
                    name="avatar"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={form.avatar}
                    onChange={change}
                    className={`mt-1 ${inputClass}`}
                  />
                </label>

                {form.avatar && (
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        avatar: "",
                      }))
                    }
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove Selected Photo
                  </button>
                )}
              </div>

              {/* SOURCE */}
              <label className="text-sm font-medium">
                Source
                <select
                  name="source"
                  value={form.source}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                >
                  <option value="website">Website</option>
                  <option value="google">
                    Google (Only Genuine)
                  </option>
                  <option value="other">Other</option>
                </select>
              </label>

              {/* REVIEW DATE */}
              <label className="text-sm font-medium">
                Review Date
                <input
                  type="date"
                  name="reviewDate"
                  value={form.reviewDate}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                />
              </label>

              {/* SOURCE URL */}
              <label className="sm:col-span-2 text-sm font-medium">
                Original Review URL (Optional)
                <input
                  type="url"
                  name="sourceUrl"
                  value={form.sourceUrl}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                  placeholder="https://..."
                />
              </label>

              {/* DISPLAY ORDER */}
              <label className="text-sm font-medium">
                Display Order
                <input
                  type="number"
                  name="sortOrder"
                  value={form.sortOrder}
                  onChange={change}
                  className={`mt-1 ${inputClass}`}
                />
              </label>

              {/* STATUS */}
              <div className="flex flex-col justify-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={change}
                  />
                  Published
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={form.verified}
                    onChange={change}
                  />
                  Verified (Only if Confirmed)
                </label>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="submit"
                  disabled={busy || uploading}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {uploading
                    ? "Uploading Photo..."
                    : busy
                    ? "Saving..."
                    : "Save Review"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={uploading || busy}
                  className="rounded-xl border px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
