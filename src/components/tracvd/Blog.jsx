import React from "react";
import { ChevronRight } from "lucide-react";

// Static data for now. Replace this array with API data later.
const blogSections = [
  {
    title: "ভেহিকেল ট্র্যাকিং সিস্টেম",
    slug: "vehicle-tracking-system",
    posts: [
      { title: "আপনার গাড়ি কি অনুমোদিত রুটের বাইরে চলছে? জিপিএস ট্র্যাকিং জানাবে", image: "https://prohori.com/wp-content/uploads/2025/10/is-your-car-driving-outside-the-approved-route-bn-thumb-300x150.webp" },
      { title: "বাংলাদেশে গাড়ি চুরির পরিসংখ্যান — কেন গাড়ি সতর্ক রাখবেন?", image: "https://prohori.com/wp-content/uploads/2025/10/car-theft-statistics-bangladesh-bn-thumbnail-300x150.webp" },
      { title: "গাড়ির তেল এবং জ্বালানি খরচ কমাতে জিপিএস ট্র্যাকারের ভূমিকা", image: "https://prohori.com/wp-content/uploads/2025/10/reduce-fuel-toll-with-gps-tracker-300x150.webp" },
    ],
  },
  {
    title: "গাড়ির গল্প",
    slug: "car-stories",
    posts: [
      { title: "গাড়ি নাকি বিমান? Tesla Flying Roadster নিয়ে অবাক প্রযুক্তি!", image: "https://prohori.com/wp-content/uploads/2026/10/tesla-flying-roadster-300x150.webp" },
      { title: "ঢাকায় গাড়ির অ্যাক্সেসরিজ কেনার আগে যা জানা প্রয়োজন", image: "https://prohori.com/wp-content/uploads/2024/09/car-accessories-shop-in-dhaka-300x150.webp" },
      { title: "গাড়ির সাইলেন্সার থেকে পানি পড়ার কারণ ও সমাধান", image: "https://prohori.com/wp-content/uploads/2024/08/causes-and-solutions-of-water-leaking-from-car-silencer-300x150.jpg" },
    ],
  },
  {
    title: "জিপিএস ট্র্যাকার",
    slug: "gps-tracker",
    posts: [
      { title: "আপনার গাড়ির জ্বালানি চুরি হচ্ছে কিনা কীভাবে বুঝবেন?", image: "https://prohori.com/wp-content/uploads/2025/12/how-do-you-know-if-your-cars-fuel-is-stolen-300x150.webp" },
      { title: "জিপিএস ট্র্যাকিং: গাড়ির মালিক ও ড্রাইভারের জন্য সহজ সমাধান", image: "https://prohori.com/wp-content/uploads/2025/10/gps-tracking-for-car-owners-bn-thumb-300x150.webp" },
      { title: "অনুমোদিত রুটের বাইরে গাড়ি গেলে কীভাবে জানতে পারবেন?", image: "https://prohori.com/wp-content/uploads/2025/10/is-your-car-driving-outside-the-approved-route-bn-thumb-300x150.webp" },
    ],
  },
  {
    title: "গাড়ির টিপস",
    slug: "car-tips",
    posts: [
      { title: "গাড়ির সাইলেন্সার থেকে পানি পড়লে কী করবেন?", image: "https://prohori.com/wp-content/uploads/2024/08/causes-and-solutions-of-water-leaking-from-car-silencer-300x150.jpg" },
      { title: "গাড়ির জন্য প্রয়োজনীয় অ্যাক্সেসরিজ বেছে নেওয়ার উপায়", image: "https://prohori.com/wp-content/uploads/2024/09/car-accessories-shop-in-dhaka-300x150.webp" },
      { title: "গাড়ির জ্বালানি খরচ কমানোর কার্যকর উপায়", image: "https://prohori.com/wp-content/uploads/2025/10/reduce-fuel-toll-with-gps-tracker-300x150.webp" },
    ],
  },
  {
    title: "অটোমোবাইল",
    slug: "automobile",
    posts: [
      { title: "গাড়ির নিরাপত্তায় আধুনিক প্রযুক্তির ভূমিকা", image: "https://prohori.com/wp-content/uploads/2025/10/car-theft-statistics-bangladesh-bn-thumbnail-300x150.webp" },
      { title: "গাড়ির রুট ও চলাচল সম্পর্কে গুরুত্বপূর্ণ তথ্য", image: "https://prohori.com/wp-content/uploads/2025/10/is-your-car-driving-outside-the-approved-route-bn-thumb-300x150.webp" },
      { title: "নতুন গাড়ি প্রযুক্তি: Tesla Flying Roadster", image: "https://prohori.com/wp-content/uploads/2026/10/tesla-flying-roadster-300x150.webp" },
    ],
  },
];

function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-[2px] bg-white shadow-[0_2px_7px_rgba(0,0,0,0.13)] transition-shadow duration-200 hover:shadow-lg">
      <div className="aspect-[2/1] w-full overflow-hidden bg-gray-200">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
        />
      </div>
      <div className="min-h-[77px] px-3 py-3 sm:px-4">
        <h3 className="text-[14px] font-semibold leading-[1.55] text-[#171717] sm:text-[15px]">
          {post.title}
        </h3>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <main className="w-full bg-white font-sans text-gray-900">
      {blogSections.map((section, index) => (
        <section
          key={section.slug}
          id={section.slug}
          className={index % 2 === 0 ? "bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#EAF3FF]" : "bg-white"}
        >
          <div className="mx-auto max-w-[1080px] px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="border-l-[3px] border-[#f15b37] pl-3 text-base font-bold leading-6 text-[#161616] sm:text-lg">
                {section.title}
              </h2>
              {/* Static page: jump to this section, without pretending a category route exists. */}
              <a
                href={`#${section.slug}`}
                className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#f15b37] hover:underline"
                aria-label={`${section.title} বিভাগ দেখুন`}
              >
                আরও দেখুন <ChevronRight size={16} strokeWidth={2} />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.posts.map((post, postIndex) => (
                <BlogCard key={`${section.slug}-${postIndex}`} post={post} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
