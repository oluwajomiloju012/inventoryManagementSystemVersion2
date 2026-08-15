const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      ]
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'salesperson', 'storekeeper'],
      default: 'salesperson'
    },
    phone: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;