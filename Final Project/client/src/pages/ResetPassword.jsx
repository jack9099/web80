import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router";

export default function ResetPassword() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const togggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const togggleShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { token } = useParams();

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
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

    // Reset Password API Call
    try {
      const response = await axiosInstance.post(`/reset-password/${token}`, {
        password: password,
        token: token,
      });
      // Handle successfull reset password response
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
          <form class="max-w-lg w-full mx-auto" onSubmit={handleResetPassword}>
            <div class="mb-12">
              <h3 class="text-gray-800 text-4xl font-extrabold">
                Reset your password
              </h3>
              <p class="text-gray-800 text-sm mt-4 ">
                Enter your new password{" "}
              </p>
            </div>
            <div>
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
                Update password
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
