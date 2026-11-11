import React from "react";

//Trackvio About page. Navbar/Footer are provided by the existing MainLayout.
const images = {
  hero: "https://prohori.com/wp-content/uploads/2026/08/Best-GPS-Tracker-for-Cars-in-Bangladesh.webp",
  story: "https://prohori.com/wp-content/uploads/2025/08/About-us-1024x481.jpg",
  technology: "https://prohori.com/wp-content/uploads/2025/08/pic4.png",
};

const Section = ({ title, children, image, alt, reverse = false, muted = false, attribution }) => (
  <section className={`py-16 md:py-24 ${muted ? "bg-[#f0f0f0]" : "bg-white"}`}>
    <div className={`mx-auto grid max-w-[1050px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 lg:px-8 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <h2 className="mb-5 text-2xl font-bold leading-snug text-[#078bba] md:text-[28px]">{title}</h2>
        <div className="text-[15px] leading-[1.9] text-[#30343b]">{children}</div>
      </div>
      <div>
        <img src={image} alt={alt} loading="lazy" className="w-full rounded-xl object-contain" />
        {attribution && <p className="mt-3 text-right text-xs text-gray-500">{attribution}</p>}
      </div>
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#262626]">
      {/* Reference: large cyan-blue introductory hero */}
      <section className="relative overflow-hidden bg-[#1496c8] px-5 pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <div className="mx-auto grid max-w-[1050px] items-center gap-9 md:grid-cols-[1.25fr_0.75fr] md:gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold leading-[1.3] tracking-tight md:text-5xl lg:text-[58px]">প্রতিযোগিতা নয়, সহযোগিতা</h1>
            <p className="mt-4 text-base md:text-lg">একা চলার চেয়ে একসাথে এগিয়ে যাওয়াই আমাদের বিশ্বাস।</p>
            <div className="mt-5 h-[2px] w-24 bg-white/70 mx-auto md:mx-0" />
          </div>
          <div className="mx-auto w-full max-w-[350px]">
            <img src={images.hero} alt="Vehicle GPS tracking illustration" className="max-h-[260px] w-full rounded-lg bg-white/10 object-contain" />
            <p className="mt-3 border-l-2 border-white/80 pl-3 text-sm font-medium">trackvd — নিরাপদ যাত্রায় প্রযুক্তির সহযোগী</p>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-12 w-[65%] -translate-x-1/2 rounded-t-2xl border border-white/10" />
      </section>

      <Section title="সীমার মাঝে অসীমের খুঁজি..." image={images.story} alt="trackvd সম্পর্কে পরিচিতিমূলক ছবি" reverse>
        <p>trackvd-এর লক্ষ্য আধুনিক GPS ট্র্যাকিং প্রযুক্তির মাধ্যমে যানবাহনের নিরাপত্তা ও ব্যবস্থাপনাকে আরও সহজ করা। ব্যক্তিগত গাড়ি থেকে শুরু করে ব্যবসায়িক বহরের জন্য আমরা ব্যবহারবান্ধব ট্র্যাকিং অভিজ্ঞতা গড়ে তুলতে চাই।</p>
        <p className="mt-4">আমাদের কাছে প্রযুক্তি মানে শুধু একটি ডিভাইস নয়; এটি সময়মতো তথ্য পাওয়া, দায়িত্বশীল সিদ্ধান্ত নেওয়া এবং নিশ্চিন্তে এগিয়ে যাওয়ার একটি উপায়।</p>
      </Section>

      <Section title="নয় অনুকরণ, নিজ প্রযুক্তিতে গড়ব দেশ" image={images.technology} alt="প্রযুক্তি ও উদ্ভাবনের চিত্র" muted>
        <p>দেশের বাস্তব প্রয়োজনকে গুরুত্ব দিয়েTrackvio কাজ করে। গাড়ির অবস্থান পর্যবেক্ষণ, যাত্রাপথের তথ্য এবং বহর ব্যবস্থাপনার মতো বিষয়গুলো সহজভাবে উপস্থাপন করাই আমাদের উদ্দেশ্য।</p>
        <p className="mt-4">নতুন ধারণা, কার্যকর প্রযুক্তি এবং গ্রাহকের অভিজ্ঞতা—এই তিনটি বিষয়কে সামনে রেখে আমরা আমাদের সেবা উন্নত করতে চাই।</p>
      </Section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[850px] text-center">
          <h2 className="mb-8 text-2xl font-bold text-[#078bba] md:text-3xl">trackvd সম্পর্কে আরও জানুন</h2>
          <div className="flex aspect-video items-center justify-center rounded-xl border border-gray-200 bg-[#f3f5f7] shadow-sm">
            <div className="px-5 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff6c25] text-2xl text-white">▶</div>
              <p className="text-sm text-gray-600">trackvd-এর অফিসিয়াল ভিডিও এখানে যুক্ত করুন</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">ভিডিওর URL দেওয়া হয়নি, তাই অন্য প্রতিষ্ঠানের ভিডিও ব্যবহার করা হয়নি।</p>
        </div>
      </section>
    </main>
  );
}
