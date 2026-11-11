
// import React, { useState, useEffect } from "react";
// import { NavLink, Link, useLocation } from "react-router-dom";
// import { Menu, X, Users } from "lucide-react";
// import logo from "../../assets/images/logo.png";

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [language, setLanguage] = useState("Eng");
//   const location = useLocation();

//   const navLinks = [
//     { title: "কর্পোরেট", href: "/corporate" },
//     { title: "শীর্ষ ক্লায়েন্টসমূহ", href: "/clients" },
//     { title: "দরদাম", href: "/pricing" },
//     { title: "ফ্রি ডেমো", href: "/demo" },
//     { title: "ব্লগ", href: "/blog" },
//     { title: "আমাদের সম্পর্কে", href: "/about" },
//   ];

//   // Route change হলে mobile menu বন্ধ হবে
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location.pathname]);

//   // Mobile menu খোলা থাকলে background scroll বন্ধ
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // Escape key দিয়ে mobile menu বন্ধ
//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleEscape);

//     return () => {
//       window.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   const desktopLinkClass = ({ isActive }) =>
//     `relative whitespace-nowrap text-base font-medium
//     transition-colors duration-200
//     ${
//       isActive
//         ? "text-[#E85125]"
//         : "text-gray-700 hover:text-[#E85125]"
//     }`;

//   const mobileLinkClass = ({ isActive }) =>
//     `block w-full text-lg font-medium
//     transition-colors duration-200
//     ${
//       isActive
//         ? "text-[#E85125]"
//         : "text-gray-800 hover:text-[#E85125]"
//     }`;

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between">

//           {/* ================= LOGO ================= */}
//           <div className="flex-shrink-0">
//             <Link
//               to="/"
//               className="flex items-center"
//               onClick={() => setIsOpen(false)}
//             >
//               <img
//                 src={logo}
//                 alt="trackvd Logo"
//                 className="h-12 w-auto object-contain"
//               />
//             </Link>
//           </div>

//           {/* ================= DESKTOP MENU ================= */}
//           <nav
//             className="hidden items-center space-x-6 lg:flex xl:space-x-8"
//             aria-label="Main navigation"
//           >
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.href}
//                 to={link.href}
//                 className={desktopLinkClass}
//               >
//                 {link.title}
//               </NavLink>
//             ))}
//           </nav>

//           {/* ================= DESKTOP RIGHT ================= */}
//           <div className="hidden items-center space-x-6 lg:flex">

//             {/* Phone Number */}
//             <a
//               href="tel:01700786848"
//               className="flex items-center gap-2 text-base font-semibold text-gray-800 transition-colors hover:text-[#E85125]"
//             >
//               <Users className="h-5 w-5 text-gray-700" />
//               <span>01700786848</span>
//             </a>

//             {/* Language Button */}
//             <button
//               type="button"
//               className="rounded-full border-2 border-gray-400 px-4 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-[#E85125] hover:text-[#E85125]"
//               aria-label="Language"
//             >
//               {language}
//             </button>
//           </div>

//           {/* ================= MOBILE MENU BUTTON ================= */}
//           <div className="flex items-center lg:hidden">
//             <button
//               type="button"
//               onClick={() => setIsOpen(true)}
//               className="p-2 text-gray-700 transition-colors hover:text-[#E85125] focus:outline-none"
//               aria-label="Open navigation menu"
//               aria-expanded={isOpen}
//             >
//               <Menu className="h-8 w-8" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU OVERLAY ================= */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white lg:hidden">

//           {/* Mobile Header */}
//           <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//             >
//               <img
//                 src={logo}
//                 alt="trackvd Logo"
//                 className="h-9 w-auto object-contain"
//               />
//             </Link>

//             <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="p-2 text-[#E85125] transition-opacity hover:opacity-80"
//               aria-label="Close navigation menu"
//             >
//               <X className="h-8 w-8" />
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           <nav
//             className="flex-1 px-6 py-2"
//             aria-label="Mobile navigation"
//           >
//             <ul className="divide-y divide-gray-200">

//               {navLinks.map((link) => (
//                 <li key={link.href} className="py-4">
//                   <NavLink
//                     to={link.href}
//                     onClick={() => setIsOpen(false)}
//                     className={mobileLinkClass}
//                   >
//                     {link.title}
//                   </NavLink>
//                 </li>
//               ))}

//               {/* Mobile Phone */}
//               <li className="py-4">
//                 <a
//                   href="tel:01700786848"
//                   className="flex items-center gap-3 text-lg font-semibold text-gray-800"
//                 >
//                   <Users className="h-5 w-5" />
//                   <span>01700786848</span>
//                 </a>
//               </li>

//               {/* Mobile Language */}
//               <li className="py-4">
//                 <button
//                   type="button"
//                   className="rounded-full border border-gray-400 px-5 py-1.5 text-base font-medium text-gray-800"
//                   aria-label="Language"
//                 >
//                   {language}
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navigation;

import React, { useState, useEffect, useRef } from "react";
import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  PhoneCall,
  ChevronRight,
  ArrowUpRight,
  Globe2,
  Building2,
  UsersRound,
  BadgeDollarSign,
  Gift,
  Newspaper,
  Info,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import logo from "../../assets/images/logo.png";

const PHONE = "01700786848";

const navLinks = [
  {
    title: "কর্পোরেট",
    href: "/corporate",
    icon: Building2,
  },
  {
    title: "শীর্ষ ক্লায়েন্টসমূহ",
    href: "/clients",
    icon: UsersRound,
  },
  {
    title: "দরদাম",
    href: "/pricing",
    icon: BadgeDollarSign,
  },
  {
    title: "ফ্রি ডেমো",
    href: "/demo",
    icon: Gift,
    featured: true,
  },
  {
    title: "ব্লগ",
    href: "/blog",
    icon: Newspaper,
  },
  {
    title: "আমাদের সম্পর্কে",
    href: "/about",
    icon: Info,
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("Eng");

  const location = useLocation();
  const closeButtonRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Escape key and initial focus
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "Eng" ? "বাংলা" : "Eng"
    );
  };

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full
          border-b border-slate-200/80
          bg-white/95 backdrop-blur-xl
          transition-all duration-300
          ${
            scrolled
              ? "shadow-[0_8px_30px_rgba(15,23,42,0.09)]"
              : "shadow-[0_2px_12px_rgba(15,23,42,0.035)]"
          }
        `}
      >
        {/* Orange top accent */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#ff6b1a] via-[#ff9b21] to-[#ff6b1a]" />

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div
            className={`
              flex items-center justify-between gap-4
              transition-all duration-300
              ${scrolled ? "h-[72px]" : "h-[82px]"}
            `}
          >
            {/* ================= LOGO ================= */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group relative flex shrink-0 items-center"
              aria-label="trackvd Home"
            >
              <img
                src={logo}
                alt="trackvd Logo"
                className="h-11 w-auto max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-[1.04] lg:h-12"
              />
            </Link>

            {/* ================= DESKTOP NAVIGATION ================= */}
            <nav
              className="hidden items-center gap-1 xl:gap-2 lg:flex"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;

                if (link.featured) {
                  return (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) =>
                        `
                        group relative inline-flex
                        items-center gap-1.5
                        whitespace-nowrap
                        rounded-xl px-3.5 py-2.5
                        text-[13px] font-semibold
                        transition-all duration-300
                        xl:px-4 xl:text-sm
                        ${
                          isActive
                            ? "bg-orange-50 text-[#f26522]"
                            : "text-slate-700 hover:bg-orange-50 hover:text-[#f26522]"
                        }
                        `
                      }
                    >
                      <Gift size={15} />

                      {link.title}

                      <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#f26522] transition-all duration-300 group-hover:w-1/2" />
                    </NavLink>
                  );
                }

                return (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `
                      group relative inline-flex
                      items-center justify-center
                      whitespace-nowrap
                      rounded-xl px-3 py-2.5
                      text-[13px] font-medium
                      transition-all duration-300
                      xl:px-4 xl:text-sm
                      ${
                        isActive
                          ? "bg-orange-50/80 text-[#f26522]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#f26522]"
                      }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.title}

                        <span
                          className={`
                            absolute bottom-[3px]
                            left-1/2 h-[2px]
                            -translate-x-1/2
                            rounded-full bg-[#f26522]
                            transition-all duration-300
                            ${
                              isActive
                                ? "w-[45%]"
                                : "w-0 group-hover:w-[45%]"
                            }
                          `}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* ================= DESKTOP RIGHT ================= */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
              {/* Phone */}
              <a
                href={`tel:${PHONE}`}
                className="group flex items-center gap-2.5 rounded-xl px-2 py-2 transition-all hover:bg-orange-50"
                aria-label={`Call ${PHONE}`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#f26522] transition-all group-hover:bg-[#f26522] group-hover:text-white">
                  <PhoneCall size={17} />
                </div>

                <div className="hidden flex-col xl:flex">
                  <span className="text-[10px] font-medium text-slate-400">
                    Call Us
                  </span>

                  <span className="text-[13px] font-bold tracking-wide text-slate-800 transition group-hover:text-[#f26522]">
                    {PHONE}
                  </span>
                </div>
              </a>

              {/* Language */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-[#f26522]"
                aria-label="Toggle language preference"
              >
                <Globe2 size={15} />

                {language}
              </button>
            </div>

            {/* ================= MOBILE RIGHT ================= */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Call */}
              <a
                href={`tel:${PHONE}`}
                aria-label="CallTrackvio"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#f26522] transition hover:bg-orange-100"
              >
                <PhoneCall size={19} />
              </a>

              {/* Hamburger */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="trackvd-mobile-menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f26522] text-white shadow-[0_5px_15px_rgba(242,101,34,0.25)] transition-all hover:bg-[#dd5517] active:scale-95"
              >
                <Menu size={23} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {isOpen && (
        <div
          id="trackvd-mobile-menu"
          className="fixed inset-0 z-[100] lg:hidden"
        >
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-[3px]"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 flex h-full w-[min(88vw,390px)] flex-col overflow-hidden bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.18)]"
          >
            {/* Drawer Header */}
            <div className="relative border-b border-slate-100 bg-gradient-to-br from-white to-orange-50/70 px-6 pb-5 pt-6">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={closeMenu}
                  aria-label="trackvd Home"
                >
                  <img
                    src={logo}
                    alt="trackvd Logo"
                    className="h-11 w-auto max-w-[150px] object-contain"
                  />
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#f26522]"
                >
                  <X size={21} />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-[#f26522]">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                   Trackvio
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Vehicle Tracking Solutions
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="mb-4 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                ExploreTrackvio
              </p>

              <nav aria-label="Mobile navigation">
                <ul className="space-y-1.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <li key={link.href}>
                        <NavLink
                          to={link.href}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `
                            group flex items-center
                            justify-between gap-3
                            rounded-xl px-3 py-3.5
                            transition-all duration-200
                            ${
                              isActive
                                ? "bg-orange-50 text-[#f26522]"
                                : "text-slate-700 hover:bg-slate-50 hover:text-[#f26522]"
                            }
                            `
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="flex items-center gap-3">
                                <span
                                  className={`
                                    flex h-10 w-10
                                    items-center justify-center
                                    rounded-xl transition-all
                                    ${
                                      isActive
                                        ? "bg-orange-100 text-[#f26522]"
                                        : "bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-[#f26522]"
                                    }
                                  `}
                                >
                                  <Icon size={19} />
                                </span>

                                <span className="text-sm font-semibold">
                                  {link.title}
                                </span>
                              </span>

                              <ChevronRight
                                size={17}
                                className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#f26522]"
                              />
                            </>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Mobile Demo CTA */}
              <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#fff2e9] to-[#fff9f4] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#f26522]">
                  <Gift size={19} />

                  <span className="text-sm font-bold">
                    Free Demo
                  </span>
                </div>

                <p className="mb-4 text-xs leading-6 text-slate-600">
                 Trackvio GPS Tracking System সম্পর্কে
                  বিস্তারিত জানতে ডেমো দেখুন।
                </p>

                <Link
                  to="/demo"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f26522] px-4 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(242,101,34,0.2)] transition hover:bg-[#dd5517]"
                >
                  ফ্রি ডেমো নিন
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-5">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
                  <Headphones size={21} />
                </div>

                <div className="flex-1">
                  <p className="text-[11px] text-slate-500">
                    Need assistance?
                  </p>

                  <p className="text-sm font-bold text-slate-800">
                    {PHONE}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-[#f26522]"
                />
              </a>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  © {new Date().getFullYear()}Trackvio
                </p>

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  <Globe2 size={15} />
                  {language}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
