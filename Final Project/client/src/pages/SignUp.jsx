import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const togggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const togggleShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    if (!confirmPassword) {
      setError("Please enter your confirm password");
      return;
    }
    if (password != confirmPassword) {
      setError("Password and confirm password should be the same");
      return;
    }
    setError("");

    // Sign Up API Call
    try {
      const response = await axiosInstance.post("/sign-up", {
        userName: name,
        email: email,
        password: password,
      });
      // Handle successfull registration response
      if (response.data) {
        navigate("/sign-in");
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
          <form class="max-w-lg w-full mx-auto" onSubmit={handleSignUp}>
            <div class="mb-12">
              <h3 class="text-gray-800 text-4xl font-extrabold">
                Create an account
              </h3>
            </div>

            <div>
              <label class="text-gray-800 text-xs block mb-2">User Name</label>
              <div class="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="mt-6">
              <label class="text-gray-800 text-xs block mb-2">Email</label>
              <div class="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
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
            <div class="mt-6">
              <label class="text-gray-800 text-xs block mb-2">Password</label>
              <div class="relative flex items-center">
                <input
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
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
            <div class="mt-6">
              <label class="text-gray-800 text-xs block mb-2">
                Confirm Password
              </label>
              <div class="relative flex items-center">
                <input
                  name="confirm-password"
                  type={isShowConfirmPassword ? "text" : "password"}
                  class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                {isShowConfirmPassword ? (
                  <FaRegEye
                    size={20}
                    className="text-primary cursor-pointer absolute right-2"
                    onClick={() => togggleShowConfirmPassword()}
                  ></FaRegEye>
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    className="text-slate-400 cursor-pointer absolute right-2"
                    onClick={() => togggleShowConfirmPassword()}
                  ></FaRegEyeSlash>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
            <div class="mt-12">
              <button
                type="submit"
                class="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                Create an account
              </button>
              <p class="text-sm mt-6 text-gray-800">
                Already have an account?{" "}
                <Link to="/sign-in">
                  <a
                    href="javascript:void(0);"
                    class="text-blue-500 font-semibold hover:underline ml-1"
                  >
                    Login here
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
