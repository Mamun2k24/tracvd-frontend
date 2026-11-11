import React, { useState } from 'react';

// --- Assets & Data Constants ---
const BANNER_IMG = "https://prohori.com/wp-content/uploads/2026/09/prohori-gps-tracker-server-banner-1024x240.webp";
const CALL_CENTER_IMG = "https://prohori.com/wp-content/uploads/2026/06/Corporate-Support-icon.webp";

const CLIENT_LOGOS = [
  { name: "Unilever", url: "https://prohori.com/wp-content/uploads/2025/08/client-2.png" },
  { name: "Energypac", url: "https://prohori.com/wp-content/uploads/2025/08/client-3-1.png" },
  { name: "Chams Group", url: "https://prohori.com/wp-content/uploads/2025/08/client-1.png" },
  { name: "PDS", url: "https://prohori.com/wp-content/uploads/2025/08/client-11.png" },
  { name: "Pandora", url: "https://prohori.com/wp-content/uploads/2025/08/Pandora-1.png" },
  { name: "Horizon Group", url: "https://prohori.com/wp-content/uploads/2025/08/Horizon-Group-1.png" },
  { name: "Akij Group", url: "https://prohori.com/wp-content/uploads/2026/06/akij-group-logo.png" },
  { name: "MAB Denim", url: "https://prohori.com/wp-content/uploads/2025/08/client-4.png" },
  { name: "Perfect Pack", url: "https://prohori.com/wp-content/uploads/2025/08/client-7.png" }
];

const FEATURE_SECTIONS = [
  {
    id: "sec1",
    bgColor: "bg-white",
    title: "গাড়ি কোথায় আছে জানতে পারবো?",
    subtitle: "(একসাথে অনেক গাড়ির দায়িত্ব আপনার কাঁধে। হঠাৎ যেকোন একটি গাড়ির খোঁজ জানতে চাচ্ছেন, কিন্তু ড্রাইভারের উপরও ভরসা করতে পারছেন না।)",
    heading: "আপনার সমস্যাইTrackvioর মাথাব্যথার কারণ",
    points: [
      "লাইভ ট্র্যাকিং:Trackvio পোর্টালে গাড়ির নাম্বার লিখে সার্চ করে আপনি যেকোনও গাড়ির তৎক্ষণাৎ অবস্থান জানতে পারবেন।"
    ],
    highlightBox: "একসাথে অনেক গাড়ি,\trackvd দিয়ে ট্র্যাক করি!",
    buttonBg: "bg-blue-500 hover:bg-blue-600",
    image: "https://prohori.com/wp-content/uploads/2025/08/Fleet-2-300x251.png",
    imageFirst: false
  },
  {
    id: "sec2",
    bgColor: "bg-white",
    title: "আমার গাড়ির সংখ্যা তো অনেক, প্রতিটি গাড়ির আলাদা আলাদা তথ্য জানা যাবে?",
    subtitle: "(একসাথে অনেক গাড়ির দায়িত্ব আপনার কাঁধে। হঠাৎ যেকোন একটি গাড়ির খোঁজ জানতে চাচ্ছেন, কিন্তু ড্রাইভারের উপরও ভরসা করতে পারছেন না)",
    heading: "আপনার প্রশ্ন,Trackvioর উত্তর",
    points: [
      "ডেইলি সামারি- সবগুলো গাড়ির সমস্ত তথ্য দিন শেষে একবারে সামারি আকারে অটোমেটিক আপনার মোবাইলে পৌঁছে যাবে।"
    ],
    highlightBox: "সকল খবর কীভাবে জানি\nএতগুলো গাড়ির?\nসংখ্যাটা যতই হোক\nসাহায্য নিনTrackvioর।",
    buttonBg: "bg-blue-500 hover:bg-blue-600",
    image: "https://prohori.com/wp-content/uploads/2025/08/Fleet-3-300x256.png",
    imageFirst: true
  },
  {
    id: "sec3",
    bgColor: "bg-cyan-50/70",
    title: "ফুয়েল কতটুকু আছে বা কতক্ষণ পরে রিফিল করতে হবে সেটা জানা যাবে?",
    subtitle: "(এক সাথে অনেক গাড়ি মেইনটেইন করতে গিয়ে এই ফুয়েল খরচ অনেক সময়ই বেড়ে যায়। আবার অনেক সময় পর্যাপ্ত ফুয়েল না থাকার কারণে রাস্তার মাঝখানেই গাড়ি বন্ধ হয়ে যায়, সেক্ষেত্রে প্রতিটি গাড়ির ফুয়েল লেভেল সম্পর্কে স্পষ্ট ধারনা থাকা জরুরী)।",
    heading: "জ্বালানীর সকল উপাত্ত,Trackvio দিচ্ছে লিখিত",
    points: [
      "ফুয়েল মনিটরিং সিস্টেম: আপনার ফোন গাড়ি কতটুকু জ্বালানী খরচ করেছে, কতটুকু জ্বালানী অবশিষ্ট আছে তার সকল উত্তর পাবেন স্মার্ট ফোনের এক ক্লিকেই।"
    ],
    highlightBox: "কোন গাড়ি কতটুকু\nখরচ করলো জ্বালানী?\trackvd ব্যবহার করুন\nজেনে যাবেন এখনই!",
    buttonBg: "bg-orange-500 hover:bg-orange-600",
    image: "https://prohori.com/wp-content/uploads/2025/08/Fleet-4.png",
    imageFirst: false
  },
  {
    id: "sec4",
    bgColor: "bg-white",
    title: "গাড়ি নির্দিষ্ট গন্তব্যে পৌঁছলে অটোম্যাটিক জানা যাবে?",
    subtitle: "(অনেক গাড়ি থাকায় ফ্লিট ম্যানেজারের পক্ষে সবগুলো গাড়ির তথ্য নির্দিষ্ট সময়ে নির্দিষ্ট গন্তব্যে পৌঁছলো কিনা সেটা জানাও জরুরী।)",
    heading: "আপনার টেনশনে ভরসা করুনTrackvioতে",
    points: [
      "ডেসটিনেশন অ্যালার্ট- ডেসটিনেশন অ্যালার্ট সেট করে দিলে গাড়ি সেট করে দেয়া গন্তব্যে পৌঁছলেই অটো এসএমএস পাবেন।"
    ],
    highlightBox: "গাড়ি পৌঁছলে গন্তব্যে\trackvd জানাবে মন্তব্যে",
    buttonBg: "bg-orange-500 hover:bg-orange-600",
    image: "https://prohori.com/wp-content/uploads/2025/08/Fleet-5.png",
    imageFirst: true
  },
  {
    id: "sec5",
    bgColor: "bg-orange-50/60",
    title: "ড্রাইভার মিথ্যা বলছে না তো?",
    subtitle: "(অনেক সময় গাড়ি এমন হয় যে গাড়ি আছে গাবতলি ড্রাইভার বলছে মহাখালী। এমতাবস্থায় ফ্লিট ম্যানেজারের পক্ষে সুনির্দিষ্ট সিদ্ধান্ত নেয়া বেশ কষ্টসাধ্য হয়ে পড়ে)",
    heading: "trackvdর চিকিৎসায়, আর নয় মিথ্যায়",
    points: [
      "লাইভ ট্র্যাকিং- লাইভ ট্র্যাকিং এর মাধ্যমে একজন ফ্লিট ম্যানেজার তার যেকোন গাড়ির তৎক্ষণাৎ অবস্থান সম্পর্কে স্পষ্ট ধারণা পাবেন।"
    ],
    highlightBox: "কোথায় আছে গাড়ি\nগন্তব্যে কী পৌঁছলো?\nড্রাইভারকে ছাড়ুন\trackvdকে বলুন হ্যালো!",
    buttonBg: "bg-purple-600 hover:bg-purple-700",
    image: "https://prohori.com/wp-content/uploads/2025/08/Fleet-6.png",
    imageFirst: false
  },
  {
    id: "sec6",
    bgColor: "bg-white",
    title: "খাতায় না লিখেও পূর্ণাঙ্গ হিসাব রাখা সম্ভব?",
    subtitle: "(একসাথে অনেক ড্রাইভারের তথ্য খাতা কলমে রাখা বেশ সময় সাপেক্ষ। অথচ ড্রাইভারদের মধ্যে তুলনা করতে হলে এই হিসেবগুলো করা খুব জরুরী)",
    heading: "খরচ কমিয়ে স্মার্ট হোন, খাতা ছেড়েTrackvio আনুন",
    points: [
      "ডেইলি সামারি- সবগুলো গাড়ির সমস্ত তথ্য দিনশেষে একবারে সামারি আকারে অটোমেটিক আপনার মোবাইলে এসএমএস আকারে চলে যাবে।",
      "মাইলেজ রিপোর্ট- কোন দিন কোন রুটে কত কিলোমিটার ভ্রমণ করেছে তার রিপোর্ট পাওয়া যাবে।",
      "ড্রাইভার র‍্যাংকিং-Trackvio ব্যবহারে এসি, ফুয়েল, মাইলেজ ইত্যাদি বিভিন্ন ভিত্তিতে মাস শেষে ড্রাইভারদের অটোম্যাটিক র‍্যাংকিং পাওয়া যাবে।"
    ],
    highlightBox: "বহু গাড়ি একবারে হিসাবটা টাফ?\nদেখে নিনTrackvioর ডিজিটাল গ্রাফ",
    buttonBg: "bg-purple-600 hover:bg-purple-700",
    image: "https://prohori.com/wp-content/uploads/2025/08/Fleet-7-300x244.png",
    imageFirst: true
  }
];

// --- Header Sub-component ---
export const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-extrabold text-orange-500 tracking-tight">trackvd</span>
        <span className="text-xs bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded">GPS</span>
      </div>
      <nav className="hidden md:flex space-x-6 text-sm text-gray-700 font-medium">
        <a href="#clients" className="hover:text-orange-500 transition">কর্পোরেট</a>
        <a href="#features" className="hover:text-orange-500 transition">শীর্ষ ক্লায়েন্টসমূহ</a>
        <a href="#hero" className="hover:text-orange-500 transition">দরদাম</a>
        <a href="#hero" className="hover:text-orange-500 transition">ফ্রি ডেমো</a>
        <a href="#features" className="hover:text-orange-500 transition">ব্লগ</a>
        <a href="#features" className="hover:text-orange-500 transition">আমাদের সম্পর্কে</a>
      </nav>
      <div className="flex items-center space-x-3">
        <a href="tel:01708166178" className="text-sm font-bold text-gray-800 hover:text-orange-500 flex items-center gap-1">
          <span>📞</span> 01708166178
        </a>
        <button className="text-xs bg-gray-100 text-gray-600 border border-gray-300 rounded px-2 py-1 hover:bg-gray-200">
          Eng
        </button>
      </div>
    </div>
  </header>
);

// --- Hero & Form Section ---
export const HeroSection = () => {
  const [formData, setFormData] = useState({ company: '', phone: '', vehicleCount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ধন্যবাদ! আপনার অনুরোধ জমা নেওয়া হয়েছে।\nপ্রতিষ্ঠানের নাম: ${formData.company}`);
  };

  return (
    <section id="hero" className="bg-gradient-to-b from-gray-100 to-gray-50 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Banner Image */}
        <div className="w-full mb-8 rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <img src={BANNER_IMG} alt="Prohori Banner" className="w-full object-cover max-h-56" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Hero Left Content */}
          <div className="md:col-span-7 space-y-5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
              প্রতিষ্ঠানের একাধিক গাড়ি মনিটরিং এর জন্য দেশের <span className="text-orange-500">Best GPS Tracking Solutions</span> খুঁজছেন?
            </h1>
            <ul className="space-y-3 text-gray-700 text-base md:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>এক স্ক্রিনে সব গাড়ির লাইভ আপডেট দেখুন।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>স্মার্টভাবে ফুয়েল এলোকেশন ও খরচ ম্যানেজ করুন।</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="tel:01708166178" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded shadow transition inline-flex items-center gap-2">
                Talk To Expert
              </a>
              <a href="https://wa.me/8801708165178" target="_blank" rel="noreferrer" className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded shadow transition inline-flex items-center gap-2">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Call Center Form Card */}
          <div className="md:col-span-5 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-orange-500 p-4 text-white flex items-center gap-3">
              <img src={CALL_CENTER_IMG} alt="Support" className="w-12 h-12 rounded-full border-2 border-white object-cover bg-white" />
              <div>
                <h3 className="font-bold text-lg leading-tight">ফর্মটি পূরণ করুন।</h3>
                <p className="text-xs text-orange-100">trackvd গ্রাহক সেবা প্রতিনিধির সহয়তা নিন।</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">প্রতিষ্ঠানের নাম</label>
                <input 
                  type="text" 
                  required
                  placeholder="কোম্পানির নাম লিখুন" 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">মোবাইল নম্বর</label>
                <input 
                  type="tel" 
                  required
                  placeholder="017XXXXXXXX" 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">গাড়ির সংখ্যা</label>
                <input 
                  type="number" 
                  required
                  placeholder="গাড়ির সংখ্যা" 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  value={formData.vehicleCount}
                  onChange={(e) => setFormData({ ...formData, vehicleCount: e.target.value })}
                />
              </div>

              {/* Dummy Captcha Placeholder */}
              <div className="border border-gray-200 bg-gray-50 rounded p-2 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <input type="checkbox" required id="captcha" className="w-4 h-4 text-orange-500" />
                  <label htmlFor="captcha">Verify you are human</label>
                </div>
                <span className="font-semibold text-gray-400 text-[10px]">CLOUDFLARE</span>
              </div>

              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded shadow transition">
                সাবমিট করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Clients Section ---
export const ClientsSection = () => (
  <section id="clients" className="py-12 bg-gray-100 border-t border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
        আমাদের কর্পোরেট ক্লায়েন্ট সমূহ।
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {CLIENT_LOGOS.map((client, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-24 hover:shadow-md transition">
            <img src={client.url} alt={client.name} className="max-h-14 max-w-full object-contain" />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2 rounded-full shadow transition text-sm">
          More Clients
        </button>
      </div>
    </div>
  </section>
);

// --- Feature Item Sub-component ---
export const FeatureBlock = ({ data }) => {
  const content = (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">{data.title}</h3>
      <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed">{data.subtitle}</p>
      
      <div className="pt-2 space-y-2">
        <h4 className="text-base md:text-lg font-bold text-gray-800">{data.heading}</h4>
        <ul className="space-y-2">
          {data.points.map((pt, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3">
        <a href="#hero" className={`inline-block text-white text-xs font-semibold px-5 py-2 rounded shadow transition ${data.buttonBg}`}>
          প্যাকেজ দেখুন
        </a>
      </div>
    </div>
  );

  const imageIllustration = (
    <div className="flex flex-col items-center text-center">
      <div className="w-full max-w-xs md:max-w-sm mb-4">
        <img src={data.image} alt={data.title} className="w-full h-auto object-contain mx-auto max-h-60" />
      </div>
      {data.highlightBox && (
        <div className="text-cyan-600 font-bold text-xs md:text-sm whitespace-pre-line leading-relaxed bg-cyan-50/50 p-3 rounded-lg border border-cyan-100 max-w-xs">
          {data.highlightBox}
        </div>
      )}
    </div>
  );

  return (
    <div className={`py-12 border-b border-gray-100 ${data.bgColor}`}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {data.imageFirst ? (
          <>
            <div className="order-2 md:order-1">{imageIllustration}</div>
            <div className="order-1 md:order-2">{content}</div>
          </>
        ) : (
          <>
            <div className="order-1">{content}</div>
            <div className="order-2">{imageIllustration}</div>
          </>
        )}
      </div>
    </div>
  );
};

// --- Features Section Wrapper ---
export const FeaturesSection = () => (
  <section id="features">
    {FEATURE_SECTIONS.map((sec) => (
      <FeatureBlock key={sec.id} data={sec} />
    ))}
  </section>
);

// --- Main Page Component ---
export default function ProhoriLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
      <Header />
      <main>
        <HeroSection />
        <ClientsSection />
        <FeaturesSection />
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-xs">
        © {new Date().getFullYear()} Prohori GPS Tracker. All Rights Reserved.
      </footer>
    </div>
  );
}