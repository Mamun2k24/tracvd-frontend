import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import HeroSlider from "../../components/HomeHero/HeroSlider";
import ProductCategory from "../productCategory/ProductCategory";
import AutoScrollingProducts from "../../components/AutoScrollingProducts";
import FlashSalePurple from "../../components/zozo/FlashSalePurple";
import PopularProduct from "./sections/popularProducts/PopularProducts";
import FeaturesBanner from "../../components/ui/FeaturesBanner";
import BenefitsAndSecuritySection from "../../components/tracvd/BenefitsAndSecuritySection";
import VideoAndFeaturesSection from "../../components/tracvd/VideoAndFeaturesSection";
import TrackvdSections from "../../components/tracvd/TrackvdSections";

// Lazy Components
const OurBrands = lazy(() => import("../../components/OurBrands"));
const VideoPromo = lazy(() => import("../../components/zozo/VideoPromo"));
const RecentlyViewed = lazy(() => import("../../components/RecentlyViewed"));

const Home = () => {
  return (
    <div>

      <Helmet>
        {/* Primary SEO */}
        <title>
          GPS Tracker in Bangladesh | Vehicle Tracking - Trackvio BD
        </title>

        <meta
          name="description"
          content="Buy GPS tracker devices in Bangladesh from Trackvio BD. Explore real-time GPS tracking solutions for cars, bikes and other vehicles with reliable vehicle monitoring services."
        />

        <meta
          name="keywords"
          content="GPS Tracker Bangladesh, GPS Tracker BD, Vehicle Tracking System, Car GPS Tracker, Bike GPS Tracker, GPS Tracking Device, Real Time GPS Tracking, Trackvio BD, Vehicle Tracker Bangladesh"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://trackviobd.com/" />

        {/* Open Graph - Facebook & WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_BD" />
        <meta property="og:site_name" content="Trackvio BD" />
        <meta
          property="og:title"
          content="Trackvio BD | GPS Tracker & Vehicle Tracking in Bangladesh"
        />
        <meta
          property="og:description"
          content="Discover GPS tracking devices for cars, bikes and other vehicles in Bangladesh. Shop vehicle tracking solutions at Trackvio BD."
        />
        <meta property="og:url" content="https://trackviobd.com/" />
        <meta
          property="og:image"
          content="https://trackviobd.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Trackvio BD - GPS Tracker & Vehicle Tracking Service"
        />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Trackvio BD | GPS Tracker in Bangladesh"
        />
        <meta
          name="twitter:description"
          content="Shop GPS trackers and explore vehicle tracking solutions for cars and bikes in Bangladesh with Trackvio BD."
        />
        <meta
          name="twitter:image"
          content="https://trackviobd.com/og-image.jpg"
        />
      </Helmet>


      <HeroSlider />

      {/* <FlashSalePurple /> */}
      <BenefitsAndSecuritySection />
      <VideoAndFeaturesSection />
      <TrackvdSections />

      {/* <Suspense fallback={null}>
        <VideoPromo />
      </Suspense> */}

      <Suspense fallback={null}>
        <RecentlyViewed />
      </Suspense>
    </div>
  );
};

export default Home;