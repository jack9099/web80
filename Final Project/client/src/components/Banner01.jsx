import React from "react";

export default function Banner01() {
  return (
    <div class="bg-gray-800 font-sans min-h-[350px] relative max-w-6xl mx-auto mt-10 rounded overflow-hidden">
      <div class="grid lg:grid-cols-2 w-full h-full absolute inset-0">
        <div class="p-4 max-lg:hidden">
          <img
            src="https://readymadeui.com/image-1.webp"
            class="object-cover w-full h-full"
            alt="img"
          />
        </div>

        <div class="flex flex-col items-end justify-center text-right px-8 relative bg-[#262464] rounded-tl-[206px] z-20 before:absolute before:inset-0 before:!left-auto before:bg-[#293587] before:w-2/3 before:rounded-bl-[206px] before:-z-10">
          <h3 class="font-bold sm:text-4xl text-2xl text-yellow-400">
            Unlock Your Potential
          </h3>
          <p class="text-sm text-gray-300 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>

          <button
            type="button"
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-4 px-8 font-semibold rounded w-max mt-8"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
