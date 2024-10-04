import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: { type: String },
  createdAt: { type: Date },
  expiredAt: { type: String },
});

const OtpModel = mongoose.model("otps", otpSchema);

export default OtpModel;
