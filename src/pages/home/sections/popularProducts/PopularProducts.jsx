
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";

import ProductLoader from "../../../../Spinner/ProductLoader";
import useFlashSaleStatus from "../../../../hooks/useFlashSaleStatus";

// =========================
// HELPERS
// =========================

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("bn-BD");

const getImage = (product) => {
  const images = product?.productImage;

  const image = Array.isArray(images) ? images[0] : images;

  if (typeof image === "string") return image;

  if (image && typeof image === "object") {
    return image.url || image.secure_url || image.src || "";
  }

  return "";
};

const getFeatures = (product) => {
  if (!Array.isArray(product?.features)) return [];

  return product.features
    .map((feature) => {
      if (typeof feature === "string") return feature;

      if (feature && typeof feature === "object") {
        return feature.name || feature.title || feature.label || "";
      }

      return "";
    })
    .filter(Boolean);
};

const getProductInfo = (product, campaignActive) => {
  const originalPrice = Number(product?.price || 0);

  const flashEnabled =
    campaignActive && product?.flashSale?.enabled === true;

  const price = flashEnabled
    ? Number(product?.flashSale?.salePrice ?? originalPrice)
    : originalPrice;

  const regularPrice = flashEnabled
    ? originalPrice
    : Number(product?.regularPrice || 0);

  const discount =
    regularPrice > price && price > 0
      ? Math.round(((regularPrice - price) / regularPrice) * 100)
      : 0;

  const stockNumber = Number(product?.stock || 0);

  const isOutOfStock =
    product?.status === "out_of_stock" ||
    stockNumber <= 0;

  const isPreBook =
    product?.preBook?.enabled === true &&
    product?.preBook?.closed !== true;

  const canOrder = !isOutOfStock || isPreBook;

  return {
    price,
    regularPrice,
    discount,
    isOutOfStock,
    isPreBook,
    canOrder,
    orderLabel: !isOutOfStock
      ? "এখনই কিনুন"
      : isPreBook
      ? "প্রি-বুক করুন"
      : "স্টক নেই",
  };
};

// =========================
// ANIMATION
// =========================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 24,
    },
  },
};

// =========================
// PRODUCT DETAILS MODAL
// Portal keeps modal outside
// transformed product cards.
// =========================

function ProductDetailsModal({
  product,
  campaignActive,
  onClose,
  onOrder,
}) {
  const productName = product?.productName || "GPS Package";
  const imageSrc = getImage(product);
  const features = getFeatures(product);

  const {
    price,
    regularPrice,
    discount,
    isOutOfStock,
    isPreBook,
    canOrder,
    orderLabel,
  } = getProductInfo(product, campaignActive);

  const productUrl = `/product-details/${product._id}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      key="product-details-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-950/70
        p-3 backdrop-blur-[5px]
        sm:p-6
      "
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${productName} details`}
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
        onClick={(event) => event.stopPropagation()}
        className="
          relative flex w-full max-w-[780px]
          max-h-[90dvh] flex-col
          overflow-hidden rounded-2xl
          bg-white shadow-2xl
          sm:rounded-3xl
        "
      >
        {/* MODAL HEADER */}
        <div
          className="
            flex shrink-0 items-center justify-between
            bg-gradient-to-r
            from-[#ff7816] to-[#f4511e]
            px-5 py-4 text-white
            sm:px-7 sm:py-5
          "
        >
          <div>
            <p className="text-[11px] font-medium text-white/80">
              trackvd GPS Tracking
            </p>

            <h2 className="mt-1 text-lg font-extrabold sm:text-xl">
              প্যাকেজ বিস্তারিত
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              flex h-10 w-10 items-center
              justify-center rounded-full
              bg-white/20 transition
              hover:rotate-90 hover:bg-white/30
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="min-h-0 overflow-y-auto p-5 sm:p-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* IMAGE */}
            <div>
              <div
                className="
                  flex h-[210px] items-center
                  justify-center rounded-2xl
                  border border-orange-100
                  bg-gradient-to-br
                  from-orange-50 to-white
                  p-6 sm:h-[270px]
                "
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={productName}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Package
                    size={75}
                    className="text-orange-400"
                  />
                )}
              </div>

              <div
                className="
                  mt-4 flex items-center gap-2
                  rounded-xl bg-emerald-50
                  px-4 py-3 text-xs
                  font-semibold text-emerald-700
                "
              >
                <ShieldCheck size={19} />
                trackvd GPS Tracking Package
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex min-w-0 flex-col">
              <h3
                className="
                  break-words text-xl font-extrabold
                  leading-snug text-slate-900
                  sm:text-2xl
                "
              >
                {productName}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-[#f4511e]">
                  ৳{formatMoney(price)}
                </span>

                {regularPrice > price && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{formatMoney(regularPrice)}
                  </span>
                )}

                {discount > 0 && (
                  <span
                    className="
                      rounded-full bg-orange-100
                      px-2.5 py-1 text-xs
                      font-bold text-orange-600
                    "
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>

              <div className="mt-4">
                <span
                  className={`
                    inline-flex items-center
                    rounded-full px-3 py-1.5
                    text-xs font-bold
                    ${
                      !isOutOfStock
                        ? "bg-green-100 text-green-700"
                        : isPreBook
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                >
                  {!isOutOfStock
                    ? "● In Stock"
                    : isPreBook
                    ? "● Pre-Book Available"
                    : "● Out of Stock"}
                </span>
              </div>

              {product?.monthlyCharge != null && (
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  মাসিক চার্জ: <span className="text-[#f4511e]">৳{formatMoney(product.monthlyCharge)}/মাস</span>
                </p>
              )}

              {/* FEATURES */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h4 className="mb-4 text-sm font-extrabold text-slate-800">
                  প্যাকেজের ফিচারসমূহ
                </h4>

                {features.length > 0 ? (
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li
                        key={`${feature}-${index}`}
                        className="
                          flex items-start gap-2
                          text-sm leading-6 text-slate-600
                        "
                      >
                        <CheckCircle2
                          size={17}
                          className="
                            mt-1 shrink-0
                            text-emerald-500
                          "
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-6 text-slate-500">
                    এই প্যাকেজের বিস্তারিত ফিচার এবং
                    স্পেসিফিকেশন দেখতে প্রোডাক্ট
                    ডিটেইলস পেজে যান।
                  </p>
                )}
              </div>

              {/* MODAL ACTIONS */}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to={productUrl}
                  onClick={onClose}
                  className="
                    flex items-center justify-center
                    gap-2 rounded-xl
                    bg-gradient-to-r
                    from-[#f4511e] to-[#ff7816]
                    px-5 py-3 text-center text-sm
                    font-bold text-white
                    shadow-lg shadow-orange-100
                    transition hover:brightness-110
                  "
                >
                  সম্পূর্ণ বিস্তারিত দেখুন
                  <ArrowRight size={17} />
                </Link>

                <button
                  type="button"
                  disabled={!canOrder}
                  onClick={() => {
                    onClose();
                    onOrder(product._id);
                  }}
                  className="
                    flex items-center justify-center
                    gap-2 rounded-xl
                    border border-orange-400
                    px-5 py-3 text-sm
                    font-bold text-orange-600
                    transition hover:bg-orange-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <ShoppingCart size={17} />
                  {orderLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// =========================
// PRODUCT CARD
// =========================

function ProductCard({
  product,
  index,
  campaignActive,
  onOrder,
  onViewDetails,
}) {
  const productName = product?.productName || "GPS Package";
  const imageSrc = getImage(product);
  const features = getFeatures(product);

  const {
    price,
    regularPrice,
    discount,
    isOutOfStock,
    isPreBook,
    canOrder,
    orderLabel,
  } = getProductInfo(product, campaignActive);

  const featureCount =
    features.length ||
    (Number(product?.featureCount) > 0
      ? Number(product.featureCount)
      : null);

  const productUrl = `/product-details/${product._id}`;

  let badgeText = "";

  if (isOutOfStock && !isPreBook) {
    badgeText = "OUT OF STOCK";
  } else if (discount > 0) {
    badgeText = `${discount}% OFF`;
  } else if (product?.isPopular === true) {
    badgeText = "POPULAR";
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -7,
        boxShadow: "0 18px 40px rgba(15,23,42,0.13)",
      }}
      className="
        group relative flex min-w-0 flex-col
        rounded-2xl border border-slate-200
        bg-white
        shadow-[0_3px_12px_rgba(0,0,0,0.07)]
        transition-colors duration-300
        hover:border-orange-300
      "
    >
      {/* BADGE */}
      {badgeText && (
        <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
          <span
            className={`
              inline-flex whitespace-nowrap
              rounded-md px-3 py-1.5
              text-[10px] font-bold shadow-md
              sm:text-xs
              ${
                badgeText === "OUT OF STOCK"
                  ? "bg-rose-500 text-white"
                  : discount > 0
                  ? "bg-orange-500 text-white"
                  : "bg-[#ffeb00] text-slate-900"
              }
            `}
          >
            {badgeText}
          </span>
        </div>
      )}

      {/* PRODUCT NAME + IMAGE */}
      <div className="px-3 pb-3 pt-7 sm:px-4">
        <Link
          to={productUrl}
          className="
            flex min-h-[100px]
            items-center justify-between gap-2
          "
        >
          <h3
            className="
              line-clamp-3 flex-1
              text-base font-extrabold
              leading-snug text-[#f4511e]
              transition-colors
              group-hover:text-[#d83d10]
              sm:text-lg
            "
          >
            {productName}
          </h3>

          <div
            className="
              flex h-[40px] w-[40px]
              shrink-0 items-center justify-center
              overflow-hidden rounded-full
              border border-orange-200
              bg-orange-50 p-2
              transition-transform duration-300
              group-hover:scale-105
              sm:h-[75px] sm:w-[75px]
            "
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={productName}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            ) : (
              <Package
                size={32}
                className="text-orange-500"
              />
            )}
          </div>
        </Link>
      </div>

      {/* YELLOW FEATURE STRIP */}
      <div
        className="
          flex min-h-[38px]
          items-center justify-center
          bg-[#ffeb00] px-2
          text-center text-sm
          font-extrabold text-slate-900
        "
      >
        {featureCount
          ? `${formatMoney(featureCount)}+ ফিচার`
          : "GPS ট্র্যাকিং প্যাকেজ"}
      </div>

      {/* PRICE */}
      <div className="flex flex-1 flex-col px-3 pb-4 pt-4 sm:px-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[11px] text-slate-500 sm:text-xs">
              ডিভাইস মূল্য
            </p>

            <p className="mt-1 text-sm font-extrabold text-slate-900 sm:text-base">
              ৳{formatMoney(price)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-slate-500 sm:text-xs">
              মাসিক চার্জ
            </p>

            <p className="mt-1 text-sm font-extrabold text-slate-900 sm:text-base">
              {product?.monthlyCharge == null ? "—" : `৳${formatMoney(product.monthlyCharge)}`}
            </p>
          </div>
        </div>

        {regularPrice > price && (
          <div className="mt-2 text-xs text-slate-400">
            <span className="line-through">
              ৳{formatMoney(regularPrice)}
            </span>

            <span className="ml-2 font-bold text-emerald-600">
              Save ৳{formatMoney(regularPrice - price)}
            </span>
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-auto space-y-2 pt-5">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="
              flex w-full items-center justify-center
              gap-2 rounded-full
              border border-[#f4511e]
              bg-white px-2 py-2
              text-xs font-bold text-slate-800
              transition hover:bg-orange-50
              sm:text-sm
            "
          >
            <Eye size={15} className="text-[#f4511e]" />
            বিস্তারিত দেখুন
          </button>

          <button
            type="button"
            disabled={!canOrder}
            onClick={() => onOrder(product._id)}
            className={`
              flex w-full items-center justify-center
              gap-2 rounded-full px-2 py-2.5
              text-xs font-bold text-white
              shadow-[0_4px_12px_rgba(244,81,30,0.2)]
              transition active:scale-95
              sm:text-sm
              ${
                !canOrder
                  ? "cursor-not-allowed bg-slate-300 shadow-none"
                  : isPreBook && isOutOfStock
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gradient-to-r from-[#f43f28] to-[#ff7816] hover:brightness-110"
              }
            `}
          >
            <ShoppingCart size={15} />
            {orderLabel}
          </button>
        </div>
      </div>


    </motion.article>
  );
}

// =========================
// MAIN COMPONENT
// =========================

const PopularProduct = () => {
  const navigate = useNavigate();
  const { campaignActive } = useFlashSaleStatus();

  const [visibleProducts, setVisibleProducts] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const BASE = import.meta.env.VITE_APP_SERVER_URL;

  const {
    data: productsResponse = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `${BASE}api/products/public?limit=48`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const products = Array.isArray(productsResponse)
    ? productsResponse
    : productsResponse?.items || [];

  const handleOrderNow = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) return <ProductLoader />;

  if (error) {
    return (
      <div className="py-12 text-center text-rose-500">
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <>
      <section
        className="
          bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#EAF3FF] py-2
          font-sans md:py-6
        "
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
  

          {/* PRODUCT GRID */}
          {products.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="
                grid grid-cols-2
                gap-x-3 gap-y-9
                sm:grid-cols-3 sm:gap-x-4
                lg:grid-cols-4
                xl:grid-cols-5
              "
            >
              {products
                .slice(0, visibleProducts)
                .map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={index}
                    campaignActive={campaignActive}
                    onOrder={handleOrderNow}
                    onViewDetails={handleViewDetails}
                  />
                ))}
            </motion.div>
          ) : (
            <div className="py-16 text-center text-slate-500">
              কোনো প্যাকেজ পাওয়া যায়নি।
            </div>
          )}

          {/* LOAD MORE */}
          {visibleProducts < products.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleProducts((prev) => prev + 30)
                }
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  bg-gradient-to-r
                  from-orange-500 to-orange-600
                  px-8 py-3 text-sm
                  font-bold text-white
                  shadow-lg transition
                  hover:-translate-y-1
                "
              >
                আরও প্যাকেজ দেখুন
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ONE GLOBAL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            key={selectedProduct._id}
            product={selectedProduct}
            campaignActive={campaignActive}
            onClose={handleCloseModal}
            onOrder={handleOrderNow}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PopularProduct;
