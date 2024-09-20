import mongoose, { Schema } from "mongoose";
import { type } from "os";

const filmSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const FilmModel = mongoose.model("films", filmSchema);

export default FilmModel;
