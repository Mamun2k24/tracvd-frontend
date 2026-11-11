// layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NewFooter from "../components/footer/NewFooter";
import Navigation from "../components/navigation/Navigation";
import ScrollToTop from "../context/ScrollToTop";
import BottomMobileNav from "../components/navigation/BottomMobileNav";
import Snowfall from "../components/Snowfall"; // 👈 ১. Snowfall কম্পোনেন্টটি ইমপোর্ট করুন
// import ChatboxWidget from "../components/chatbox/ChatboxWidget";

const MainLayout = () => {
  return (
    <div>

      <ScrollToTop />
      <Navigation />
      <Outlet />
      {/* <BottomMobileNav /> */}
      <NewFooter />


    </div>
  );
};

export default MainLayout;