"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50 items-center">
      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`p-3 rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/254711506498"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center group relative"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-whatsapp"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.36 2.76 1.045 3.966L.048 16l4.205-1.102a7.9 7.9 0 0 0 3.738.93h.004c4.367 0 7.928-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.364c-1.185 0-2.346-.319-3.364-.922l-.24-.142-2.502.656.666-2.438-.156-.248a6.38 6.38 0 0 1-.976-3.336c.003-3.515 2.864-6.377 6.383-6.377a6.36 6.36 0 0 1 4.512 1.87 6.36 6.36 0 0 1 1.865 4.51c-.002 3.516-2.863 6.377-6.382 6.377zm3.498-4.757c-.191-.096-1.13-.56-1.306-.624-.176-.064-.305-.096-.433.096-.128.192-.493.624-.604.752-.11.128-.22.144-.412.048-.191-.096-.807-.297-1.536-.94-.567-.5-.95-1.118-1.061-1.31-.11-.192-.012-.296.084-.391.088-.088.191-.22.286-.33.096-.11.128-.192.191-.32.064-.128.032-.24-.015-.336-.048-.096-.433-1.045-.593-1.43-.158-.378-.318-.327-.433-.332-.11-.005-.24-.005-.367-.005-.128 0-.336.048-.512.24-.176.192-.671.656-.671 1.6 0 .944.688 1.856.784 1.984.096.128 1.353 2.064 3.277 2.888.458.196.815.312 1.094.4.46.146.88.125 1.214.072.373-.058 1.13-.462 1.288-.908.158-.446.158-.828.11-.908-.048-.08-.176-.128-.367-.224z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat with us
        </span>
      </Link>
    </div>
  );
}
