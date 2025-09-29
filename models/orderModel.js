const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  payment: {},
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ single buyer
  status: {
    type: String,
    enum: ['preparing', 'prepared', 'on the way', 'delivered'], // ✅ fixed enum
    default: "preparing"
  },
}, { timestamps: true });

module.exports = mongoose.model("Orders", orderSchema);
