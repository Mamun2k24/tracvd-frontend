import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import useGeneralSettings from "../../hooks/useGeneralSettings";

import {
  FiPhone,
  FiMapPin,
  FiMail,
  FiChevronUp,
  FiGlobe,
  FiArrowUpRight,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

import {
  FaApple,
  FaGooglePlay,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

// App & Web Portal Links Updated
const LINKS = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.trackvio.app", // আপনার প্লে স্টোর অ্যাপ লিঙ্ক দিন
  webPortal: "https://trackviobd.com", // আপনার ওয়েব পোর্টাল লিঙ্ক দিন
  appStore: "https://apps.apple.com/app/trackvio", // আপনার অ্যাপল অ্যাপ স্টোর লিঙ্ক দিন
};

const sitemap = [
  { label: "কর্পোরেট", to: "/corporate" },
  { label: "শীর্ষ ক্লায়েন্টসমূহ", to: "/clients" },
  { label: "দরদাম", to: "/pricing" },
  { label: "ফ্রি ডেমো", to: "/demo" },
  { label: "ব্লগ", to: "/blog" },
  { label: "আমাদের সম্পর্কে", to: "/about" },
];

const services = [
  { label: "GPS ট্র্যাকিং", to: "/pricing" },
  { label: "ফ্লিট ম্যানেজমেন্ট", to: "/corporate" },
  { label: "লাইভ ডেমো", to: "/demo" },
  { label: "প্যাকেজ ও মূল্য", to: "/pricing" },
];

function StoreButton({ href, icon: Icon, caption, title }) {
  const classes = `
    group flex min-w-[145px] items-center gap-3
    rounded-xl border border-white/15
    bg-white/[0.07] px-4 py-3
    text-white backdrop-blur-md
    transition-all duration-300
    hover:-translate-y-1
    hover:border-orange-400/60
    hover:bg-white/[0.12]
  `;

  const content = (
    <>
      <Icon className="h-6 w-6 shrink-0 text-orange-400" />

      <span className="text-left leading-tight">
        <span className="block text-[10px] text-slate-400">
          {caption}
        </span>

        <span className="mt-0.5 block whitespace-nowrap text-sm font-bold">
          {title}
        </span>
      </span>

      <FiArrowUpRight className="ml-auto text-slate-400 transition group-hover:text-orange-400" />
    </>
  );

  if (!href) {
    return (
      <div
        className={`${classes} cursor-not-allowed opacity-60`}
        title={`${title} link not configured`}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {content}
    </a>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-bold tracking-wide text-white">
        {children}
      </h3>

      <div className="mt-3 h-[3px] w-9 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
    </div>
  );
}

export default function NewFooter({ onSubscribe }) {
  const { data: settings } = useGeneralSettings();

  const [emailInput, setEmailInput] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const company = "Trackvd";

  const logoSrc = settings?.logoUrl || logo;
  const address = settings?.address || "";
  const phone = settings?.phone || "+8801892294141";
  const email = settings?.email || "";

  // Dynamic & Fallback Social Links Setup
  const facebookLink = settings?.facebookUrl || "https://www.facebook.com/trackviobd";
  const youtubeLink = settings?.youtubeUrl || "https://youtube.com/@trackvio?si=dKygZHVMMgCYkoyQ";
  const instagramLink = settings?.instagramUrl;
  const linkedinLink = settings?.linkedinUrl;
  const whatsappLink = "https://wa.me/8801892294141";

  const social = [
    {
      name: "Facebook",
      href: facebookLink,
      Icon: FaFacebookF,
    },
    {
      name: "WhatsApp",
      href: whatsappLink,
      Icon: FaWhatsapp,
    },
    {
      name: "YouTube",
      href: youtubeLink,
      Icon: FaYoutube,
    },
    {
      name: "Instagram",
      href: instagramLink,
      Icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      href: linkedinLink,
      Icon: FaLinkedinIn,
    },
  ].filter((item) => item.href && item.href !== "#");

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (typeof onSubscribe !== "function") {
      setSubscribeMessage(
        "Newsletter subscription service is not connected yet."
      );
      return;
    }

    try {
      setSubmitting(true);
      setSubscribeMessage("");

      await onSubscribe(emailInput);

      setEmailInput("");
      setSubscribeMessage("সাবস্ক্রাইব করার জন্য ধন্যবাদ!");
    } catch {
      setSubscribeMessage(
        "Subscription failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#07111f] font-sans text-white">

      {/* TRACKVD PREMIUM GPS BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Dark Navy + GPS Grid Texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 15% 25%,
                rgba(249,115,22,0.09),
                transparent 35%
              ),
              radial-gradient(
                circle at 85% 70%,
                rgba(14,165,233,0.10),
                transparent 40%
              ),
              linear-gradient(
                rgba(148,163,184,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(148,163,184,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "auto, auto, 45px 45px, 45px 45px",
          }}
        />

        {/* Soft Orange Glow */}
        <div
          className="
            absolute -left-40 top-20
            h-[450px] w-[450px]
            rounded-full bg-orange-500/[0.07]
            blur-[110px]
          "
        />

        {/* Soft Blue Glow */}
        <div
          className="
            absolute -right-32 bottom-0
            h-[500px] w-[500px]
            rounded-full bg-sky-500/[0.08]
            blur-[120px]
          "
        />

        {/* GPS Tracking Route */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="
              M -100 650
              C 180 580, 250 730, 450 510
              S 760 260, 950 390
              S 1230 600, 1540 180
            "
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="8 12"
            strokeLinecap="round"
          />
          <path
            d="
              M 100 150
              C 300 250, 400 100, 600 240
              S 1000 450, 1300 180
            "
            stroke="#f97316"
            strokeWidth="1.5"
            strokeDasharray="5 14"
            opacity="0.55"
          />
          <circle cx="450" cy="510" r="22" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
          <circle cx="450" cy="510" r="7" fill="#f97316" />
          <circle cx="950" cy="390" r="25" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
          <circle cx="950" cy="390" r="7" fill="#38bdf8" />
          <circle cx="600" cy="240" r="18" stroke="#f97316" strokeWidth="1.5" opacity="0.5" />
          <circle cx="600" cy="240" r="6" fill="#f97316" />
        </svg>

        {/* Tiny Technology Dots */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 0.7px, transparent 0.7px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bottom Gradient Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07111f]/80 to-transparent" />
      </div>

      {/* TOP CTA SECTION */}
      <div className="relative z-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            
            {/* Left CTA */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400">
                <FiShield className="text-base" />
                SMART VEHICLE TRACKING
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]">
                আপনার গাড়ির নিরাপত্তা
                <span className="mt-2 block bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  এখন আপনার হাতেই
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-8 text-slate-400 sm:text-base">
                Trackvd-এর GPS ট্র্যাকিং সল্যুশন সম্পর্কে জানুন।
                আপনার গাড়ির জন্য উপযুক্ত ডিভাইস ও প্যাকেজ
                বেছে নিতে আমাদের টিমের সঙ্গে যোগাযোগ করুন।
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/demo"
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#ff7415] to-[#ff9b21] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,116,21,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(255,116,21,0.35)]"
                >
                  ফ্রি ডেমো নিন
                  <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-orange-400/50 hover:bg-white/5"
                >
                  প্যাকেজ দেখুন
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            {/* Right App Card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/20 blur-xl" />

              <div className="relative rounded-[24px] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15">
                    <FiGlobe className="text-2xl text-orange-400" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Trackvd Digital Access
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Mobile App & Web Portal
                    </p>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-7 text-slate-400">
                  Trackvd-এর অ্যাপ ও ওয়েব পোর্টাল থেকে
                  আপনার গাড়ির ট্র্যাকিং সুবিধা ব্যবহার করুন।
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <StoreButton
                    href={LINKS.googlePlay}
                    icon={FaGooglePlay}
                    caption="GET IT ON"
                    title="Google Play"
                  />

                  <StoreButton
                    href={LINKS.appStore}
                    icon={FaApple}
                    caption="Download on the"
                    title="App Store"
                  />

                  <div className="sm:col-span-2">
                    <StoreButton
                      href={LINKS.webPortal}
                      icon={FiGlobe}
                      caption="For Computer"
                      title="Web Portal"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-slate-400">
                  <FiCheckCircle className="text-base text-orange-400" />
                  আপনার Trackvd অ্যাকাউন্ট দিয়ে সেবা ব্যবহার করুন
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">

            {/* Company Information */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block" aria-label="Trackvd Home">
                <div className="inline-flex rounded-xl bg-white px-4 py-3">
                  <img
                    src={logoSrc}
                    alt="Trackvd Logo"
                    className="h-12 max-w-[170px] object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = logo;
                    }}
                  />
                </div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-8 text-slate-400">
                Trackvd — আপনার গাড়ির জন্য আধুনিক GPS
                ট্র্যাকিং ও ভেহিকেল ম্যানেজমেন্ট সল্যুশন।
              </p>

              <div className="mt-7 space-y-4">
                {address && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-400">
                      <FiMapPin size={18} />
                    </div>
                    <p className="pt-1 text-sm leading-7 text-slate-400">
                      {address}
                    </p>
                  </div>
                )}

                {phone && (
                  <a
                    href={`tel:${String(phone).replace(/[^\d+]/g, "")}`}
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-400">
                      <FiPhone size={18} />
                    </div>
                    <span className="text-sm text-slate-400 transition group-hover:text-orange-400">
                      {phone}
                    </span>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-400">
                      <FiMail size={18} />
                    </div>
                    <span className="break-all text-sm text-slate-400 transition group-hover:text-orange-400">
                      {email}
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Sitemap */}
            <div className="lg:col-span-2">
              <FooterHeading>সাইট ম্যাপ</FooterHeading>
              <nav aria-label="Footer Sitemap" className="flex flex-col items-start gap-4">
                {sitemap.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500/50 transition group-hover:bg-orange-400" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <FooterHeading>আমাদের সেবা</FooterHeading>
              <nav className="flex flex-col items-start gap-4">
                {services.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500/50 transition group-hover:bg-orange-400" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter & Social Links */}
            <div className="lg:col-span-4">
              <FooterHeading>আমাদের সাথে যুক্ত থাকুন</FooterHeading>

              <p className="mb-6 max-w-sm text-sm leading-7 text-slate-400">
                Trackvd-এর নতুন আপডেট, সেবা ও গুরুত্বপূর্ণ
                তথ্য পেতে আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-md overflow-hidden rounded-xl border border-white/15 bg-white/[0.07] p-1.5 transition focus-within:border-orange-400/60"
              >
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="আপনার ইমেইল লিখুন"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="shrink-0 rounded-lg bg-gradient-to-r from-[#ff7415] to-[#ff9b21] px-4 py-3 text-xs font-bold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60 sm:px-5"
                >
                  {submitting ? "Sending..." : "Subscribe"}
                </button>
              </form>

              {subscribeMessage && (
                <p role="status" className="mt-3 text-xs text-orange-300">
                  {subscribeMessage}
                </p>
              )}

              {/* Social Links */}
              <div className="mt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Follow Trackvd
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {social.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-orange-400"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs leading-6 text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">{company}</span>
            . সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-5">
            <Link to="/about" className="text-xs text-slate-400 transition hover:text-orange-400">
              About Us
            </Link>

            <Link to="/demo" className="text-xs text-slate-400 transition hover:text-orange-400">
              Free Demo
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#ff7415] to-[#ff9b21] text-white shadow-[0_6px_20px_rgba(255,116,21,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,116,21,0.4)]"
            >
              <FiChevronUp size={22} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}