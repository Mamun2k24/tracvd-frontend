
import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

const WHATSAPP_NUMBER = "+8801892294141";

// তোমার Facebook Page username অথবা Page ID বসাও।
const MESSENGER_USERNAME = "trackviobd";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "আসসালামু আলাইকুম, Trackvd GPS Tracker সম্পর্কে জানতে চাই।"
    )}`;

  const messengerUrl =
    `https://m.me/${MESSENGER_USERNAME}`;

  const openChat = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">

      {/* Chat Options */}
      {open && (
        <div className="w-[270px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.18)] animate-[fadeIn_0.25s_ease-out]">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B1120] to-[#1E3A8A] px-5 py-4 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle size={19} />
              <h3 className="text-sm font-bold">
                Trackvd Support
              </h3>
            </div>
            <p className="mt-1 text-xs text-blue-100">
              আমাদের সাথে যোগাযোগ করুন
            </p>
          </div>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => openChat(whatsappUrl)}
            className="flex w-full items-center gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-green-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
              <FaWhatsapp size={24} className="text-[#16A34A]" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">
                WhatsApp
              </p>
              <p className="text-xs text-slate-500">
                WhatsApp-এ মেসেজ করুন
              </p>
            </div>
            <Send size={15} className="text-slate-400" />
          </button>

          {/* Facebook Messenger */}
          <button
            type="button"
            onClick={() => openChat(messengerUrl)}
            className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-blue-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
              <FaFacebookMessenger
                size={24}
                className="text-[#2563EB]"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">
                Messenger
              </p>
              <p className="text-xs text-slate-500">
                Facebook-এ মেসেজ করুন
              </p>
            </div>
            <Send size={15} className="text-slate-400" />
          </button>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat options" : "Open chat options"}
        aria-expanded={open}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_8px_28px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        {/* Pulse Effect */}
        {!open && (
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-blue-500/20 motion-reduce:animate-none" />
        )}

        <span className="relative transition-transform duration-300">
          {open ? (
            <X size={26} />
          ) : (
            <MessageCircle size={27} />
          )}
        </span>
      </button>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
