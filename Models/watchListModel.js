import {Schema, model} from "mongoose";
import normalize from "normalize-mongoose"

const movieSchema = new Schema(
  {
    user: {
      type: String,
      required: false,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    publishedYear:{
        type: Number,
        required: true
    },
    watched: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.plugin(normalize);

export const watchList = model("WatchList", movieSchema);
