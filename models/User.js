import { Schema, SchemaTypes, model } from "mongoose";

import { preSaveUser } from "../helpers/userHelpers";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("save", preSaveUser);

export default model("User", userSchema);
