import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axiosInstance from "../utils/axiosInstance";

export default function SignIn() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const togggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/sign-in", {
        email: email,
        password: password,
      });
      // Handle successfull login response
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
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
          <form class="max-w-lg w-full mx-auto" onSubmit={handleSignIn}>
            <div class="mb-12">
              <h3 class="text-gray-800 text-4xl font-extrabold">Sign in</h3>
              <p class="text-gray-800 text-sm mt-4 ">
                Don't have an account{" "}
                <Link to="/sign-up">
                  <a
                    href="javascript:void(0);"
                    class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </a>
                </Link>
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

            <div class="mt-8">
              <label class="text-gray-800 text-xs block mb-2">Password</label>
              <div class="relative flex items-center">
                <input
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  class="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {isShowPassword ? (
                  <FaRegEye
                    size={20}
                    className="text-primary cursor-pointer absolute right-2"
                    onClick={() => togggleShowPassword()}
                  ></FaRegEye>
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    className="text-slate-400 cursor-pointer absolute right-2"
                    onClick={() => togggleShowPassword()}
                  ></FaRegEyeSlash>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
            <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="text-gray-800 ml-3 block text-sm"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link to="/forgot-password">
                  <a
                    href="jajvascript:void(0);"
                    class="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </a>
                </Link>
              </div>
            </div>

            <div class="mt-12">
              <button
                type="submit"
                class="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                Sign in
              </button>
            </div>

            <div class="my-6 flex items-center gap-4">
              <hr class="w-full border-gray-300" />
              <p class="text-sm text-gray-800 text-center">or</p>
              <hr class="w-full border-gray-300" />
            </div>

            <button
              type="button"
              class="w-full flex items-center justify-center gap-4 py-3 px-6 text-sm font-semibold tracking-wider text-gray-800 border border-gray-300 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                class="inline"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fbbd00"
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  data-original="#fbbd00"
                />
                <path
                  fill="#0f9d58"
                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  data-original="#0f9d58"
                />
                <path
                  fill="#31aa52"
                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  data-original="#31aa52"
                />
                <path
                  fill="#3c79e6"
                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                  data-original="#3c79e6"
                />
                <path
                  fill="#cf2d48"
                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  data-original="#cf2d48"
                />
                <path
                  fill="#eb4132"
                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  data-original="#eb4132"
                />
              </svg>
              Continue with google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
