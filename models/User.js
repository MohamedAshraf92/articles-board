const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

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
      unique: true,
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
  foreignField: "author",
  localField: "_id",
});

// userSchema.pre("save", preSaveUser);
// userSchema.pre("save", (next) => preSaveUser(next));

userSchema.pre("save", async function (next) {
  const hashedPW = await bcrypt.hash(this.password, 12);
  this.password = hashedPW;
  next();
});

module.exports = model("User", userSchema);
