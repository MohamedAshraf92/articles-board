const { model, Schema, SchemaTypes } = require("mongoose");

const articleSchema = new Schema(
  {
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: [SchemaTypes.ObjectId],
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = model("Article", articleSchema);
