import React from "react";

export default function HeroBanner() {
  return (
    <div class="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
      <div class="max-md:order-1 max-md:text-center">
        <h3 class="text-gray-800 md:text-3xl text-2xl md:leading-10">
          Prompt Delivery and Enjoyable Dining Experience.
        </h3>
        <p class="mt-4 text-sm text-gray-600">
          Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla
          officia ea sit deserunt. Eu eu quis anim aute Laboris qui Lorem ad
          tempor ut reprehenderit.
        </p>
        <button
          type="button"
          class="px-5 py-2.5 mt-8 rounded text-sm outline-none tracking-wide bg-blue-600 text-white hover:bg-blue-700"
        >
          Explore
        </button>
      </div>
      <div class="md:h-[400px] p-2">
        <img
          src="https://readymadeui.com/management-img.webp"
          class="w-full h-full object-contain rounded-lg"
          alt="Dining Experience"
        />
      </div>
    </div>
  );
}
