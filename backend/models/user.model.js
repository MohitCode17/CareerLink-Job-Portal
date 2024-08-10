import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["job-seeker", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
          default: "",
        },
      },
      comapany: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
          default: "",
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
