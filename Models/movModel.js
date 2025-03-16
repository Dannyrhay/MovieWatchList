// Models/movModel.js
import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const userSchema = new Schema({
    name: { type: String, required: true, match: /^[a-zA-z]*$/ },
    email: { type: String, required: true, unique: true, match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ },
    password: { type: String, required: true, minlength: 8 },
    dateofBirth: { type: Date, required: true },
});

userSchema.plugin(normalize);

export const userModel = model("User", userSchema);