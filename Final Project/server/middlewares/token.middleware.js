import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async (userId) => {
  return await jwt.sign({ userId }, process.env.SECRECTKEY, {
    expiresIn: "7d",
  });
};

export { generateToken };
