import React from 'react';

const HeroSlider = () => {
  // Certification items list with direct image links
  const certifications = [
    {
      id: 1,
      title: 'সনদপ্রাপ্ত',
      image: 'https://prohori.com/wp-content/uploads/2025/08/ISO-Logo.png', // ISO Logo Image
      alt: 'ISO Certified'
    },
    {
      id: 2,
      title: 'অনুমোদিত',
      image: 'https://prohori.com/wp-content/uploads/2025/08/BTRC-Logo.png', // BTRC Logo Image
      alt: 'BTRC Approved'
    },
    {
      id: 3,
      title: 'নিবন্ধিত',
      image: 'https://prohori.com/wp-content/uploads/2025/08/VTS-PAB-Logo.png', // VTSPAB Logo Image
      alt: 'VTSPAB Registered'
    }
  ];

  return (
    <section className="bg-[#EAEAEA] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Vehicles Vector Illustration */}
        <div className="flex justify-center mb-8">
          <img
            src="https://prohori.com/wp-content/uploads/2025/08/vehicles-front-view.svg"
            alt="Vehicles Front View"
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>

        {/* Heading with Orange Bottom Border Accent */}
        <div className="inline-block relative mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] leading-relaxed">
            একসাথে অনেক গাড়ি, সুরক্ষা দিবে trackvio জিপিএস ট্র্যাকার
          </h1>
          <div className="w-24 h-1 bg-[#E85125] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Description Text */}
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto space-y-3 mb-8">
          trackvio জিপিএস ট্র্যাকার বাংলাদেশের (GPS Tracker in Bangladesh) একটি জনপ্রিয় ও নির্ভরযোগ্য ভেহিকেল ট্র্যাকিং সার্ভিস (VTS) সেবাদাতা প্রতিষ্ঠান। 
          আমাদের অ্যাপ ও ওয়েব পোর্টালের মাধ্যমে যেকোনো গাড়ির বর্তমান অবস্থান, গতি ও গতিবিধি নজরদারি (Vehicle Tracking) করতে পারবেন রিয়েল-টাইমে। 
          ফলে নিশ্চিত হয় গাড়ির সর্বোচ্চ নিরাপত্তা, চুরি প্রতিরোধ করা সম্ভব হয় এবং প্রতিষ্ঠানের একাধিক গাড়ি সহজে পরিচালনা ও মনিটর (Fleet Management) করা যায়। 
          গাড়ির নিরাপত্তা এখন আপনার হাতে, trackvioর সাথে।
        </p>

        {/* Action Button */}
        <div className="mb-14">
          <a
            href="#packages"
            className="inline-block bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FF512F] text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base"
          >
            প্যাকেজ দেখুন
          </a>
        </div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between min-h-[220px]"
            >
              <div className="flex-1 flex items-center justify-center w-full">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <h3 className="text-gray-800 font-bold text-lg mt-4">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSlider;