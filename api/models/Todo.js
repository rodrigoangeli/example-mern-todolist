const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const TodoItem = mongoose.model("TodoItem", todoSchema);
module.exports = TodoItem;
