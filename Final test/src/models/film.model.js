import mongoose, { Schema } from "mongoose";
import { type } from "os";

const filmSchema = new mongoose.Schema(
  {
    fimlId: {
      type: Number,
      required: true,
    },
    filmName: {
      type: String,
      required: true,
    },
    filmTime: {
      type: Number,
      required: true,
    },
    filmYear: {
      type: Number,
      required: true,
    },
    filmImage: {
      type: String,
      required: true,
    },
    filmIntroduce: {
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
