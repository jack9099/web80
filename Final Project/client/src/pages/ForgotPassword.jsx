import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");

    // Forgot Password API Call
    try {
      const response = await axiosInstance.post("/forgot-password", {
        email: email,
      });
      // Handle successfull reset password response
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      // Handle Sign Up error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again!");
      }
    }
  };
  return (
    <div class="font-[sans-serif] bg-gray-900 md:h-screen">
      <div class="grid md:grid-cols-2 items-center gap-8 h-full">
        <div class="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            class="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div class="flex items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
          <form class="max-w-lg w-full mx-auto" onSubmit={handleForgotPassword}>
            <div class="mb-12">
              <h3 class="text-gray-800 text-4xl font-extrabold">
                Forgot your password?
              </h3>
              <p class="text-gray-800 text-sm mt-4 ">
                Recive an email to reset password{" "}
              </p>
            </div>
            <div>
              <label class="text-gray-800 text-xs block mb-2">Email</label>
              <div class="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  class="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
            <div class="mt-12">
              <button
                type="submit"
                class="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                Send an OTP to your email
              </button>
              <p class="text-sm mt-6 text-gray-800">
                Don't have an account?{" "}
                <Link to="/sign-up">
                  <a
                    href="javascript:void(0);"
                    class="text-blue-500 font-semibold hover:underline ml-1"
                  >
                    Sign up here
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
