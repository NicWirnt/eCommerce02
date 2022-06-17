import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      maxlength: [30, "First name must be less than 30 characters"],
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      maxlength: [30, "Last name must be less than 30 characters"],
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: [10, "Phone number minimum must be at least 10"],
      maxlength: [15, "Phone number maximum is 15 digits"],
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      unique: true,
      index: 1,
      trime: true,
      type: String,
      required: true,
    },
    emailVerificationCode: {
      type: String,
      default: "",
    },
    password: {
      required: true,
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("admin", AdminSchema);
