
import React from "react";
import { Cpu } from "lucide-react";

const VideoAndFeaturesSection = () => {
  const youtubeVideoId = "nnUrLErFOg0";

  return (
    <div className="w-full font-sans">

      {/* =====================================
          SECTION 1: PREMIUM GPS MAP BACKGROUND
      ===================================== */}

      <section className="relative isolate w-full overflow-hidden bg-[#061526] px-4 py-12 text-white sm:px-6 md:py-20 lg:px-8">

        {/* Background Grid + Soft Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              radial-gradient(
                ellipse at 12% 30%,
                rgba(14,165,233,0.13),
                transparent 45%
              ),
              radial-gradient(
                ellipse at 88% 75%,
                rgba(249,115,22,0.10),
                transparent 40%
              ),
              linear-gradient(
                rgba(56,189,248,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(56,189,248,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "auto, auto, 45px 45px, 45px 45px",
          }}
        />

        {/* GPS Map Route Illustration */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Subtle Street Network */}
          <g
            stroke="#1e4565"
            strokeWidth="1"
            opacity="0.5"
          >
            <path d="M0 130 L1440 420" />
            <path d="M0 320 L1440 100" />
            <path d="M0 620 L1440 520" />
            <path d="M180 0 L420 800" />
            <path d="M580 0 L790 800" />
            <path d="M1020 0 L1200 800" />
            <path d="M0 500 L1100 0" />
            <path d="M400 800 L1440 260" />
          </g>

          {/* Main Blue GPS Route */}
          <path
            d="
              M -80 640
              C 150 540, 230 690, 410 500
              S 760 230, 920 390
              S 1190 600, 1510 150
            "
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="10 12"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Secondary Orange Route */}
          <path
            d="
              M 60 200
              C 280 310, 420 100, 610 250
              S 980 480, 1330 180
            "
            stroke="#fb923c"
            strokeWidth="2"
            strokeDasharray="6 14"
            opacity="0.65"
          />

          {/* GPS Point 1 */}
          <circle
            cx="410"
            cy="500"
            r="30"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle
            cx="410"
            cy="500"
            r="9"
            fill="#38bdf8"
          />

          {/* GPS Point 2 */}
          <circle
            cx="920"
            cy="390"
            r="34"
            stroke="#fb923c"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle
            cx="920"
            cy="390"
            r="10"
            fill="#fb923c"
          />

          {/* GPS Point 3 */}
          <circle
            cx="610"
            cy="250"
            r="24"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle
            cx="610"
            cy="250"
            r="7"
            fill="#38bdf8"
          />

          {/* GPS Point 4 */}
          <circle
            cx="1200"
            cy="490"
            r="22"
            stroke="#fb923c"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle
            cx="1200"
            cy="490"
            r="7"
            fill="#fb923c"
          />
        </svg>

        {/* Small Technology Dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(125,211,252,0.5) 0.8px, transparent 0.8px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dark Overlay for Text Readability */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#061526]/30 via-transparent to-[#061526]/70"
        />

        {/* =====================================
            EXISTING VIDEO CONTENT
        ===================================== */}

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          {/* YouTube Video */}
          <div className="relative mx-auto mb-8 aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0`}
              title="trackvd GPS Tracker"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

          </div>

          {/* Title */}
          <h2 className="mb-4 text-xl font-bold leading-snug text-[#E5A823] sm:text-2xl md:text-3xl">
            trackvd GPS Tracker টেনশনলেস জীবন দিচ্ছে,
            দায়বদ্ধতা নিচ্ছে...
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-3xl text-xs leading-relaxed text-gray-300 sm:text-sm md:text-base">
            trackvd-এর GPS ট্র্যাকিং সল্যুশনের মাধ্যমে
            আপনার গাড়ির অবস্থান পর্যবেক্ষণ ও ভেহিকেল
            ম্যানেজমেন্ট আরও সহজ করুন। আপনার প্রয়োজন
            অনুযায়ী ট্র্যাকিং ডিভাইস ও সেবা সম্পর্কে
            বিস্তারিত জানতে আমাদের সঙ্গে যোগাযোগ করুন।
          </p>

        </div>
      </section>

      {/* =====================================
          SECTION 2: FEATURE CARDS
          EXISTING DESIGN PRESERVED
      ===================================== */}

      <section className="w-full bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Feature Card 1 */}
            <div className="group flex min-h-[220px] flex-col items-center justify-center rounded-xl bg-[#FCB017] p-8 text-center text-gray-900 shadow-md transition-all duration-300 hover:shadow-xl sm:p-10">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-900/80 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">

                <Cpu className="h-8 w-8 animate-pulse text-gray-900 transition-transform duration-500 group-hover:rotate-45 sm:h-10 sm:w-10" />

              </div>

              <h3 className="text-base font-bold leading-snug sm:text-lg">
                সম্পূর্ণ দেশীয় প্রযুক্তিতে
                <br />
                তৈরি অন্যরকম trackvd
              </h3>

            </div>

            {/* Feature Card 2 */}
            <div className="group flex min-h-[220px] flex-col items-center justify-center rounded-xl bg-[#FCB017] p-8 text-center text-gray-900 shadow-md transition-all duration-300 hover:shadow-xl sm:p-10">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-900/80 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">

                <div className="text-center font-extrabold leading-none text-gray-900 group-hover:animate-bounce">

                  <span className="block border-b border-gray-900 pb-0.5 text-xl sm:text-2xl">
                    24
                  </span>

                  <span className="block pt-0.5 text-sm sm:text-base">
                    7
                  </span>

                </div>
              </div>

              <h3 className="text-base font-bold leading-snug sm:text-lg">
                ২৪×৭ বিক্রয়োত্তর সেবা প্রদানে
                <br />
                রয়েছে দক্ষ কর্মী বাহিনী
              </h3>

            </div>

          </div>

          {/* Action Button */}
          <div className="text-center">

            <a
              href="#device"
              className="inline-block rounded-lg bg-[#FF6B00] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#E55F00] hover:shadow-lg sm:text-base"
            >
              ভেহিকেল জিপিএস ট্র্যাকিং ডিভাইস
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};

export default VideoAndFeaturesSection;
