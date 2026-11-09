import React from "react";

// Replace this reference list with Trackvd's verified clients before publishing.
const clients = [
  { name: "Unilever Bangladesh Limited", image: "https://prohori.com/wp-content/uploads/2025/08/client-2.png" },
  { name: "Energypac Power Generation Ltd.", image: "https://prohori.com/wp-content/uploads/2025/08/client-3-1.png" },
  { name: "Sundarban Courier Service", image: "https://prohori.com/wp-content/uploads/2025/08/client-1.png" },
  { name: "PDS Multinational Group", image: "https://prohori.com/wp-content/uploads/2025/08/client-11.png" },
  { name: "International Rice Research Institute", image: "https://prohori.com/wp-content/uploads/2025/08/client-4.png" },
  { name: "HAMS Group", image: "https://prohori.com/wp-content/uploads/2025/08/client-7.png" },
  { name: "Europcar" },
  { name: "Instrumentation Engineers Ltd." },
  { name: "Build Asia" },
  { name: "Perfect Pack" },
  { name: "Wedding Diary" },
  { name: "Youngone" },
  { name: "Pandora", image: "https://prohori.com/wp-content/uploads/2025/08/Pandora-1.png" },
  { name: "Horizon Group", image: "https://prohori.com/wp-content/uploads/2025/08/Horizon-Group-1.png" },
  { name: "Akij Group", image: "https://prohori.com/wp-content/uploads/2026/06/akij-group-logo.png" },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[#e7e7e7] px-4 py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[784px]">
        <header className="mb-7 text-center">
          <h1 className="text-xl font-medium text-[#262626] sm:text-2xl">আমাদের শীর্ষ ক্লায়েন্টসমূহ</h1>
          <div className="mx-auto mt-5 h-px w-20 bg-[#888]" />
        </header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <article key={client.name} className="flex min-h-[176px] flex-col items-center justify-center rounded-[5px] bg-[#ff7908] px-4 py-6 text-center text-white">
              <div className="flex h-[85px] w-full items-center justify-center">
                {client.image ? (
                  <img src={client.image} alt={`${client.name} logo`} loading="lazy" className="max-h-[82px] max-w-[170px] object-contain brightness-0 invert" />
                ) : (
                  <span className="text-xl font-bold leading-tight">{client.name}</span>
                )}
              </div>
              <h2 className="mt-3 text-sm font-normal leading-snug">{client.name}</h2>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
