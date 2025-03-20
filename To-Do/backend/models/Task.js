const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    assignedTo: { type: String, required: true },
    category: { type: String, enum: ["Marketing", "Training", "Others"], required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
