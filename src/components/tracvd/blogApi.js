// Keep API origin consistent with existing Vite frontend.
export const BLOG_API_BASE = (
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000"
).replace(/\/$/, "");
export const BLOG_CATEGORIES = [
  "ভেহিকেল ট্র্যাকিং সিস্টেম",
  "গাড়ির গল্প",
  "জিপিএস ট্র্যাকার",
  "গাড়ির টিপস",
  "অটোমোবাইল",
];
export async function blogFetch(
  path = "",
  { admin = false, body, ...opts } = {},
) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const headers = { ...(opts.headers || {}) };
  if (admin && token) headers.Authorization = `Bearer ${token}`;
  if (body && !(body instanceof FormData))
    headers["Content-Type"] = "application/json";
  const res = await fetch(`${BLOG_API_BASE}/api/blogs${path}`, {
    ...opts,
    headers,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}
export const blogDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
