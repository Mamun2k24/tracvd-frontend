import React from 'react';
import { 
  MapPin, 
  Gauge, 
  Bell, 
  Fuel, 
  Snowflake, 
  Activity, 
  Power, 
  FileText 
} from 'lucide-react';

const BenefitsAndSecuritySection = () => {
  // Benefits Grid Data
  const benefits = [

    { id: 1, title: 'লাইভ ট্র্যাকিং', icon: MapPin },
    { id: 2, title: 'মাইলেজ রিপোর্ট', icon: Gauge },
    { id: 3, title: 'ডেস্টিনেশন এলার্ট', icon: Bell },
    { id: 4, title: 'ফুয়েল মনিটরিং', icon: Fuel },

    { id: 5, title: 'স্পিড ভায়োলেশন এলার্ট', icon: Activity },
    { id: 6, title: 'ইঞ্জিন অন/অফ নোটিফিকেশন', icon: Power },
    { id: 7, title: 'ডেইলি সামারি', icon: FileText },
  ];

  return (
    <div className="w-full font-sans">
      
      {/* SECTION 1: Benefits Grid Section (White Background) */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#2C3E50] mb-3">
            Benefits of Using Tracvd Vehicle Tracking System
          </h2>
          <div className="w-16 h-[2px] bg-gray-300 mx-auto mb-10 md:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group bg-[#EAEAEA] hover:bg-gray-200 rounded-sm p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-[#334155] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#E85125]">
                    <IconComponent className="w-6 h-6 text-[#334155] group-hover:text-[#E85125] transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <span className="text-[#333333] text-sm sm:text-base font-medium text-left">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: Dushchinta 1 - Anti-Theft (Gray BG) */}
      <section className="w-full bg-[#ffffff] py-12 md:py-16 border-b border-gray-300/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/car-thief-trying-to-break-the-door.svg"
                alt="Prohori Vehicle Anti Theft Security"
                className="block w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[300px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-block bg-white px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ১ &rsaquo;
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                আপনার গাড়ি চুরি হয়ে গেলে কী করবেন?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                বাংলাদেশে চুরি হওয়া গাড়ি কীভাবে খুঁজে পাবেন ভাবছেন? মোবাইল অ্যাপ ওপেন করুন এবং গাড়ির ইঞ্জিন বন্ধ করে দিন। লাইভ ট্র্যাকিং ফিচার ব্যবহার করে সঠিক অবস্থান নির্ধারণ করুন এবং কাছের থানায় রিপোর্ট করুন। বিষয়টি এতটাই সহজ, তাই না? হ্যাঁ, এভাবেই আপনি rackvioর ভেহিকেল ট্র্যাকিং সার্ভিস ব্যবহার করে চুরি হওয়া গাড়ি ফিরে পেতে পারেন।
              </p>
              <h3 className="text-base sm:text-lg font-bold text-[#2C3E50] pt-2">
                trackvio GPS Tracker আপনার গাড়িকে চুরি থেকে সুরক্ষা দেবে!
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ইঞ্জিন লক:</strong> চুরি বা অননুমোদিত ব্যবহারের ক্ষেত্রে মোবাইল অ্যাপ বা SMS-এর মাধ্যমে আপনার গাড়ির ইঞ্জিন দূর থেকে বন্ধ করুন। এই ফিচারটি <a href="#packages" className="text-[#E85125] hover:underline font-medium">বেসিক প্যাকেজ</a>-এ অন্তর্ভুক্ত।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• লাউড হর্ন:</strong> এই সিকিউরিটি ফিচার গাড়ি থেকে শক্তিশালী শব্দ বের করে, যা বুজার বা সাইরেন এলার্ম হিসেবেও পরিচিত। এই ফিচারটি পাবেন <a href="#packages" className="text-[#E85125] hover:underline font-medium">স্ট্যান্ডার্ড প্যাকেজ</a>-এ।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• লাইভ ট্র্যাকিং:</strong> গাড়ির সঠিক অবস্থান ও গতিবিধি মুহূর্তেই জানুন ডিজিটাল মানচিত্রে রিয়েল-টাইম ট্র্যাকিংয়ের মাধ্যমে। এই ফিচারটি <a href="#packages" className="text-[#E85125] hover:underline font-medium">সকল প্যাকেজে</a> অন্তর্ভুক্ত।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* SECTION 10: Dushchinta 9 - Driver Misuse (Gray BG) */}
      <section className="w-full bg-[#EAEAEA] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/driver-misusing-the-car.svg"
                alt="Driver misusing the car"
                className="block w-full max-w-[350px] sm:max-w-[420px] lg:max-w-[460px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-block bg-white px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা 2
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                ড্রাইভার গাড়ির অপব্যবহার করছে না তো?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                অনেক ড্রাইভারই আছে, মালিককে না জানিয়ে খালি গাড়িতে অনৈতিকভাবে যাত্রী উঠিয়ে ট্রিপ দেয়।
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                আপনার সিঙ্গেল টেনশন, trackvioর মাল্টিপল রিলিফ!
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• লাইভ ট্র্যাকিং:</strong> লাইভ দেখুন গাড়ি যেখানে থাকার কথা সেখানে আছে কি না।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ইঞ্জিন অন/অফ নোটিফিকেশন:</strong> জানতে পারবেন গাড়ির ইঞ্জিন কতবার অন/অফ হচ্ছে।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ডোর ওপেন এলার্ট:</strong> জানুন গাড়ির কোন দরজা কোথায় কখন খোলা হচ্ছে।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• অডিও স্পায়িং:</strong> গাড়ির ভিতরে কি কথা হচ্ছে তা আপনার স্মার্ট ফোনে শুনতে পাবেন।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Dushchinta 3 - Fuel Usage (Gray BG) */}
      <section className="w-full bg-[#f6f3f3] py-12 md:py-16 border-b border-gray-300/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/car-refilling-oil-in-tank.svg"
                alt="Car refilling oil in tank"
                className="block w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-block bg-white px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ৩
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                গাড়ির ফুয়েল ব্যবহার কি আপনার ধারণার চেয়ে বেশি?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                ফুয়েল রিফিল করেছেন কিন্তু তেমন একটা ট্রাভেল করেন নি, অথচ ফুয়েল তাড়াতাড়ি শেষ হচ্ছে? অনুমান ছাড়ুন আর tackvio অ্যাপে ট্র্যাক করুন এবং খরচ নিয়ন্ত্রণ করুন।
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                লুকানো ফুয়েল ব্যবহারের উপর নিয়ন্ত্রণ রাখুন trackvio ট্র্যাকিং সিস্টেমের মাধ্যমে।
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• মাইলেজ রিপোর্ট:</strong> কোন দিন কত কিলোমিটার ভ্রমণ করেছেন এক পলকেই জানতে পারবেন। এই ফিচারটি পাবেন <a href="#packages" className="text-[#E85125] hover:underline font-medium">প্রিমিয়াম প্যাকেজ</a> এ।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ফুয়েল মনিটরিং সিস্টেম (শীঘ্রই আসছে):</strong> গাড়ির ফুয়েল(তেল) কখন, কোথায় এবং কত পরিমাণ ব্যবহার হয়েছে তা সঠিকভাবে দেখুন, যা আপনাকে একটি নির্ভুল খরচ রিপোর্ট প্রদান করবে। এই ফিচারটি রয়েছে <a href="#packages" className="text-[#E85125] hover:underline font-medium">প্রিমিয়াম প্যাকেজ</a> এ।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dushchinta 4 - Monthly Cost Report (White BG) */}
      <section className="w-full bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start items-center order-1 lg:order-1">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/vehicle-monthly-report.svg"
                alt="Vehicle monthly report"
                className="block w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-2">
              <div className="inline-block bg-[#EAEAEA] px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ৪
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                এইমাসে হঠাৎ গাড়ির খরচ এত বেড়ে গেল কেন?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                সব মাসে সমান খরচ হয় না এটা যেমন স্বাভাবিক, অপরপক্ষে হঠাৎ করে গাড়ির খরচ বেড়ে যাওয়াটাও অস্বাভাবিক! তার মানে সমস্যা আছে।
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                trackvio ভেহিকেল ট্র্যাকার আপনার অপ্রয়োজনীয় খরচ কমাতে সাহায্য করে।
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• মাইলেজ রিপোর্ট:</strong> গাড়ি কোথায় কোনদিন কত কিলোমিটার চলেছে সেই রিপোর্ট প্যাকেজ অনুযায়ী ৬ মাস পর্যন্ত trackvioকে সংরক্ষিত থাকবে।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ফুয়েল মনিটরিং সিস্টেম:</strong> দেখুন কবে কোথায় কতটুকু তেল খরচ হয়েছে। লুকানো ফুয়েল নষ্ট হওয়া মুহূর্তেই সনাক্ত করুন।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ডেইলি সামারি:</strong> সারাদিনে গাড়ি কোথায় কতটুকু কোন পথে ভ্রমণ করেছে, কতটুকু তেল খরচ হয়েছে, কতবার ইঞ্জিন অন/অফ করা হয়েছে, এসি কতক্ষণ অন ছিল, এমনকি কোন দরজা কতবার খোলা হয়েছে দিন শেষে SMS-এর মাধ্যমে Automatic জানিয়ে দিবে trackvio!
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Dushchinta 5 - School Destination (Gray BG) */}
      <section className="w-full bg-[#EAEAEA] py-12 md:py-16 border-b border-gray-300/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/live-vehicle-tracking-with-app.svg"
                alt="Live vehicle tracking with app"
                className="block w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-block bg-white px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ৫
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                ড্রাইভার বাচ্চাকে নিয়ে নির্দিষ্ট সময়ের মধ্যে স্কুলে পৌঁছলো তো?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                আপনি অফিসে ব্যস্ত আছেন। তাই ড্রাইভারের সাথে হয়তো বাচ্চাকে স্কুলে পাঠিয়েছেন। কিন্তু নিশ্চিত হতে পারছেন না বা অথবা দুশ্চিন্তায় ভুগছেন।
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                trackvio Vehicle Tracker ব্যবহার করে গাড়ির অবস্থা মুহূর্তেই জানুন এবং চিন্তা মুক্ত থাকুন।
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ডেস্টিনেশন এলার্ট:</strong> আপনার সেট করে দেয়া গন্তব্যে আপনার গাড়ি পৌঁছে গেছে কিনা তা আপনি অফিসে বা বাড়িতে বসেই জানতে পারবেন। এই ফিচারটি পাবেন <a href="#packages" className="text-[#E85125] hover:underline font-medium">স্ট্যান্ডার্ড প্যাকেজ</a> এ।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• লাইভ ট্র্যাকিং:</strong> লাইভ ট্র্যাকিং এর মাধ্যমেও জানতে পারেন গাড়ি আপনার সন্তানের স্কুল পর্যন্ত পৌঁছেছে কিনা। এই ফিচারটি পাবেন <a href="#packages" className="text-[#E85125] hover:underline font-medium">বেসিক প্যাকেজ</a> এ।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Dushchinta 6 - Over Speeding (White BG) */}
      <section className="w-full bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start items-center order-1 lg:order-1">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/high-speed-car.svg"
                alt="High speed car"
                className="block w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-2">
              <div className="inline-block bg-[#EAEAEA] px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ৬
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                ড্রাইভার অনেক বেশি গতিতে গাড়ি চালাচ্ছে না তো?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                অতিরিক্ত গতিবেগ জীবনহানির পাশাপাশি অর্থের ক্ষতিরও কারণ হতে পারে এবং বাংলাদেশে স্পিডিং ভায়োলেশন বা গতিসীমা অতিক্রম করার জন্য সরাসরি জরিমানা হতে পারে।
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                trackvio ভেহিকেল ট্র্যাকিং সিস্টেম (VTS) ব্যবহার করে আপনি সবসময় গাড়ি নিয়ন্ত্রণে রাখতে পারেন।
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• স্পিড ভায়োলেশন এলার্ট:</strong> আপনার ড্রাইভার যখন নির্ধারিত গতিসীমা অতিক্রম করবে, মুহূর্তেই নোটিফিকেশন পান। এটি আপনাকে স্পিডিং ভায়োলেশন, বাংলাদেশে ব্যয়বহুল <span className="text-[#E85125] font-semibold">জরিমানা</span> এবং অযথা penalty এড়াতে সাহায্য করে—সাথে নিরাপদ ড্রাইভিং নিশ্চিত করে।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Dushchinta 7 - Travel Route (Gray BG) */}
      <section className="w-full bg-[#EAEAEA] py-12 md:py-16 border-b border-gray-300/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/real-time-car-tracking-on-the-app.svg"
                alt="Real time car tracking on app"
                className="block w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-block bg-white px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ৭
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                গাড়ি কোন রোড দিয়ে যাচ্ছে?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                আপনি সাধারণত যে রুট ব্যবহার করেন, গাড়িতে না থাকলে ড্রাইভার সেই রুট ব্যবহার নাও করতে পারে। তার ব্যক্তিগত প্রয়োজনে গাড়ি ভিন্ন রুটে যাচ্ছে না তো!
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                ট্রাভেল হিস্ট্রি দেখাবে trackvio ট্র্যাকার
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• ট্রাভেল হিস্ট্রি মনিটরিং:</strong> গাড়ি কখন কোথায় আসা/যাওয়ার জন্য কোন রুট ব্যবহার করছে তা এক ক্লিকেই মুঠোফোনে দেখা যাবে।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• লাইভ ট্র্যাকিং:</strong> লাইভ দেখুন গাড়ি কোথায় কোন রুট ব্যবহার করছে।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Dushchinta 8 - Emergency & SOS (White BG) */}
      <section className="w-full bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start items-center order-1 lg:order-1">
              <img
                src="https://prohori.com/wp-content/uploads/2025/08/car-crash.svg"
                alt="Car Crash SOS Panic"
                className="block w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-2">
              <div className="inline-block bg-[#EAEAEA] px-3 py-1 rounded shadow-sm text-xs text-gray-600 font-medium border border-gray-200">
                দুশ্চিন্তা ৮
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight">
                ড্রাইভার বিপদে পড়লে কীভাবে জানতে পারবো?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                দুর্ঘটনা বা হঠাৎ ঝুঁকি কখনোই অপ্রত্যাশিত নয়। হাইজ্যাকিং, দুর্ঘটনা বা মেডিক্যাল ইমার্জেন্সিতে আমাদের ট্র্যাকিং সিস্টেম দ্রুত সাহায্য নিশ্চিত করে।
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                trackvio ভেহিকেল সিকিউরিটি ডিভাইস দিয়ে দ্রুত তথ্য পাঠান পরিবারের সদস্যদের কাছে।
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 pt-1">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• জরুরি পরিস্থিতিতে, প্যানিক বাটনটি</strong> আপনার সিকিউরিটি টিম বা পূর্বনির্ধারিত কন্ট্রাক্টে নীরব সতর্কতা পাঠায় যা সঙ্গে সঙ্গে পৌঁছায়।
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-bold">• গাড়ির ভিতরের লাইভ অডিও শুনুন,</strong> পরিবেশ নজরদারি করুন এবং সন্দেহজনক কর্মকাণ্ড সনাক্ত করুন।
                </li>
              </ul>
              <div className="pt-4">
                <a href="#packages" className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base">
                  প্যাকেজ দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

     

    </div>
  );
};

export default BenefitsAndSecuritySection;