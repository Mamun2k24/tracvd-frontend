
import React from "react";
import "./GpsRoad.css";

const vehicles = [
  {
    id: "bus",
    name: "Bus 102",
    type: "bus",
    status: "Active",
    direction: "right",
    speed: 14,
    delay: -4,
    lane: "top",
  },
  {
    id: "truck",
    name: "Truck 205",
    type: "truck",
    status: "Online",
    direction: "right",
    speed: 19,
    delay: -13,
    lane: "top",
  },
  {
    id: "car",
    name: "Car 305",
    type: "car",
    status: "Tracking",
    direction: "left",
    speed: 11,
    delay: -7,
    lane: "bottom",
  },
  {
    id: "bike",
    name: "Bike 408",
    type: "bike",
    status: "Active",
    direction: "left",
    speed: 9,
    delay: -2,
    lane: "bottom",
  },
];

function VehicleIcon({ type }) {
  if (type === "bike") {
    return (
      <svg viewBox="0 0 136 57" className="h-12 w-24 sm:w-28">
        <circle cx="27" cy="43" r="13" fill="#141b27" stroke="#94a3b8" strokeWidth="4" />
        <circle cx="106" cy="43" r="13" fill="#141b27" stroke="#94a3b8" strokeWidth="4" />
        <path
          d="M27 43L48 23 75 43H106L85 20H64L48 23"
          fill="none"
          stroke="#f04438"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path d="M65 18H87L94 12" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
        <path d="M48 23L39 14H28" fill="none" stroke="#d4dae3" strokeWidth="5" strokeLinecap="round" />
        <path d="M54 20L59 9H72L79 21" fill="#273c59" />
        <circle cx="65" cy="7" r="7" fill="#f8c76b" />
      </svg>
    );
  }

  if (type === "bus") {
    return (
      <svg viewBox="0 0 136 51" className="h-12 w-28 sm:w-32">
        <rect x="5" y="6" width="126" height="35" rx="7" fill="#e7f2ff" />
        <path d="M11 10H124V27H11Z" fill="#6faed4" />
        <path d="M30 10V27M49 10V27M68 10V27M87 10V27M107 10V27" stroke="#e7f2ff" strokeWidth="3" />
        <path d="M8 34H129" stroke="#2186d0" strokeWidth="5" />
        <circle cx="27" cy="41" r="7" fill="#0f172a" stroke="#7e91a2" strokeWidth="2" />
        <circle cx="106" cy="41" r="7" fill="#0f172a" stroke="#7e91a2" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "truck") {
    return (
      <svg viewBox="0 0 136 52" className="h-12 w-28 sm:w-32">
        <rect x="3" y="8" width="84" height="31" rx="3" fill="#cbd5e1" />
        <path d="M87 18H111L132 32V40H87Z" fill="#ef5350" />
        <path d="M93 22H109L120 31H93Z" fill="#82c8ea" />
        <circle cx="27" cy="40" r="7" fill="#111827" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="107" cy="40" r="7" fill="#111827" stroke="#94a3b8" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 136 52" className="h-12 w-28 sm:w-32">
      <path d="M8 24L28 20 45 7H89L110 21 126 25 130 37H5Z" fill="#e6f1f9" />
      <path d="M46 11H87L103 22H32Z" fill="#70b2d9" />
      <path d="M8 32H128" stroke="#3b82f6" strokeWidth="3" />
      <circle cx="32" cy="38" r="8" fill="#101827" stroke="#9babb9" strokeWidth="3" />
      <circle cx="104" cy="38" r="8" fill="#101827" stroke="#9babb9" strokeWidth="3" />
    </svg>
  );
}

function Vehicle({ data }) {
  return (
    <div
      className={`gps-pro-vehicle ${
        data.direction === "left" ? "gps-pro-left" : "gps-pro-right"
      } ${data.lane === "top" ? "top-[12%]" : "top-[59%]"}`}
      style={{
        "--speed": `${data.speed}s`,
        "--delay": `${data.delay}s`,
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-slate-800 shadow-lg sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          {data.name} · {data.status}
        </div>

        <div
          className={`gps-pro-icon ${
            data.direction === "left" ? "scale-x-[-1]" : ""
          }`}
        >
          <VehicleIcon type={data.type} />
        </div>
      </div>
    </div>
  );
}

export default function GpsRoad() {
  return (
    <section
      className="w-full overflow-hidden bg-[#0c1420] text-white"
      aria-label="GPS tracking highway animation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />
          <span className="text-sm font-semibold sm:text-base">
            Smart GPS Highway
          </span>
        </div>

        <span className="text-xs text-slate-400">
          Live Motion Demo
        </span>
      </div>

      <div className="gps-pro-road relative h-[205px] w-full overflow-hidden sm:h-[245px] lg:h-[275px]">
        <div className="gps-pro-top-edge" />
        <div className="gps-pro-center-line" />
        <div className="gps-pro-bottom-edge" />

        {vehicles.map((vehicle) => (
          <Vehicle key={vehicle.id} data={vehicle} />
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-4 text-[11px] text-slate-400 sm:text-xs">
        <span>4 Vehicle Types</span>
        <span>2-Way Animation</span>
        <span className="text-emerald-400">
          ● GPS Status UI
        </span>
      </div>
    </section>
  );
}
