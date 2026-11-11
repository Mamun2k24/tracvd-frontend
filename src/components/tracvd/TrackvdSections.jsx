import React, { useState } from 'react';

const initialReviews = [
  { name: 'Momenur Rahman', age: '1 year ago', text: 'I think this is the best tracker in our country. 15 months I use this tracker...' },
  { name: 'Dr Md Ali Mazrui', age: '1 year ago', text: 'Very Good Service.' },
  { name: 'Khokon Mia', age: '1 year ago', text: 'GPS কোম্পানি থেকে অনেক ভালো সার্ভিস পাচ্ছি। এবং অসংখ্য ধন্যবাদ।' },
];

const clients = [
  { name: 'Unilever Bangladesh Limited', logo: '/images/clients/unilever.png' },
  { name: 'Energypac Power Generation Ltd.', logo: '/images/clients/energypac.png' },
  { name: 'Sundarban Courier Service', logo: '/images/clients/sundarban.png' },
  { name: 'PDS Multinational Group', logo: '/images/clients/pds.png' },
  { name: 'International Rice Research Institute', logo: '/images/clients/irri.png' },
  { name: 'HAMS Group', logo: '/images/clients/hams.png' },
];

function SectionTitle({ children }) {
  return <div className="mb-7 text-center"><h2 className="text-[23px] font-normal text-[#202020]">{children}</h2><div className="mx-auto mt-5 h-px w-[90px] bg-[#999]" /></div>;
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  return <article className="min-h-[210px] rounded-xl bg-[#fafafa] p-[18px] text-sm text-black">
    <div className="flex items-start gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 font-bold">{review.name[0]}</div><div className="min-w-0 flex-1"><div className="truncate font-semibold">{review.name}</div><div className="text-xs text-gray-500">{review.age}</div></div><span className="text-xl font-bold text-[#4285f4]">G</span></div>
    <div className="mt-2 text-lg tracking-[1px] text-[#ffb400]">★★★★★ <span className="text-xs text-[#4285f4]">✿</span></div>
    <p className={`mt-1 leading-[1.45] ${expanded ? '' : 'line-clamp-3'}`}>{review.text}</p>
    {review.text.length > 65 && <button type="button" className="mt-2 text-xs text-gray-500 hover:underline" onClick={() => setExpanded(v => !v)}>{expanded ? 'Read less' : 'Read more'}</button>}
  </article>;
}

export default function trackvdSections() {
  const [reviewStart, setReviewStart] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = [0, 1, 2].map(i => initialReviews[(reviewStart + i) % initialReviews.length]);
  return <>
    <section className="bg-[#e7e7e7] pb-16 pt-8"><div className="mx-auto max-w-[1000px] px-4">
      <SectionTitle>trackvd ব্যবহারকারীদের কথা</SectionTitle>
      <div className="grid items-center gap-6 md:grid-cols-[190px_1fr] lg:gap-8">
        <div className="text-center"><h3 className="text-[21px] font-semibold">GOOD</h3><div className="mt-1 text-[30px] leading-none tracking-[-2px] text-[#ffb400]">★★★★<span className="text-gray-300">★</span></div><p className="mt-1 text-sm">Based on <strong>70 reviews</strong></p><div className="mt-1 text-[31px] font-medium tracking-[-2px]"><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></div></div>
        <div className="relative"><button aria-label="Previous reviews" type="button" onClick={() => setReviewStart(v => (v + initialReviews.length - 1) % initialReviews.length)} className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-3 py-2 shadow">‹</button><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleReviews.map((r, i) => <ReviewCard key={`${r.name}-${i}`} review={r} />)}</div><button aria-label="Next reviews" type="button" onClick={() => setReviewStart(v => (v + 1) % initialReviews.length)} className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-3 py-2 shadow">›</button></div>
      </div>
      <div className="mt-24"><SectionTitle>আমাদের শীর্ষ ক্লায়েন্টসমূহ</SectionTitle><div className="mx-auto grid max-w-[882px] gap-[18px] sm:grid-cols-2 lg:grid-cols-3">{clients.slice(0, showAll ? clients.length : 6).map(client => <div key={client.name} className="flex h-[198px] flex-col items-center justify-center rounded-[5px] bg-[#ff7908] px-4 text-center text-white"><img src={client.logo} alt={client.name} className="mb-5 h-[92px] max-w-[170px] object-contain" onError={e => { e.currentTarget.style.display = 'none' }} /><p className="text-[14px]">{client.name}</p></div>)}</div><div className="mt-8 text-center"><button type="button" onClick={() => setShowAll(v => !v)} className="rounded bg-[#ff7908] px-6 py-3 text-white shadow-lg hover:bg-[#ec6c00]">{showAll ? 'Show Less' : 'See More'}</button></div></div>
    </div></section>
    <section className="bg-white py-14"><div className="mx-auto max-w-[1024px] space-y-11 px-5 text-[16px] leading-[1.75] text-black">
      <div><h3 className="mb-4 text-lg font-medium">What is the price of a GPS tracker in Bangladesh?</h3><p>The price of a vehicle GPS tracker in Bangladesh usually ranges from ৳3,999 to ৳9,999, depending on the type of device and its features. For detailed pricing information, you can check trackvd’s GPS tracker options.</p></div>
      <div><h3 className="mb-4 text-lg font-medium">Where to buy the best GPS tracker for vehicles in Bangladesh?</h3><p>You can order directly from the official website or contact customer care to get the most suitable GPS tracker for your car, bus, truck, CNG, or ship at an affordable price.</p></div>
      <div><h3 className="mb-4 text-lg font-medium">The Best Vehicle Tracking Solutions in Bangladesh.</h3><p>Are you searching for gps tracker price in bd or the best gps tracker in bangladesh? Look no further. Our comprehensive vehicle tracking system in bangladesh offers robust security and full control over your vehicle. We provide the best gps tracker for car in bangladesh, designed to give you peace of mind and protect your valuable assets.</p></div>
      <div><h3 className="mb-4 text-lg font-medium">Why Choose trackvd GPS Tracking System?</h3><p>We offer more than just a device. Our vehicle tracking solutions are a complete management and security suite. Whether you need a simple tracking device for your car or advanced fleet management solutions, we have the perfect package for you.</p><ul className="mt-6 list-disc space-y-2 pl-12"><li><strong>Real-Time Tracking &amp; Location Monitoring:</strong> Stay in control with our real time vehicle tracking service. Our real time gps vehicle tracker allows you to see your vehicle’s location on a live map, 24/7.</li><li><strong>Advanced Fuel and Efficiency Monitoring:</strong> Our GPS fuel monitoring system helps you track fuel consumption and manage costs.</li><li><strong>Unmatched Vehicle Security and Protection:</strong> Protect your car from theft and misuse with our vehicle security system and tracking alerts.</li><li><strong>Affordable Pricing &amp; Easy Installation:</strong> We offer competitive pricing and professional vehicle tracker installation.</li></ul></div>
      <div><h3 className="mb-4 text-lg font-medium">FAQs: How Our GPS Tracking System Works?</h3><div className="space-y-10"><div><h4 className="mb-4 text-lg font-medium">How does a GPS tracker work?</h4><p>A GPS-based vehicle tracking system uses a small device installed in your car to receive satellite positioning signals. It then sends location data to your phone via the trackvd GPS vehicle tracker app.</p></div><div><h4 className="mb-4 text-lg font-medium">What are the benefits of a vehicle tracking system?</h4><p>A vehicle tracking system can assist with vehicle recovery, driver behavior monitoring, fuel efficiency, and fleet visibility.</p></div><div><h4 className="mb-4 text-lg font-medium">How much does a vehicle tracking system cost?</h4><p>The vehicle tracking system price depends on the specific features and package you choose. trackvd offers various plans to fit different needs and budgets.</p></div></div></div>
    </div></section>
     </>;
}
