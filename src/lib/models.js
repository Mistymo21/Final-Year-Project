import mongoose from "mongoose";

// Define the schema for student
const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    matric_no: {
      type: String,
      required: [true, "Matric number is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const StaffSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    staff_id: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      enumerator: ["Hod", "Faculty Officer", "Level adviser"],
      required: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);


const ClearanceSubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

  // Snapshot of student's info at submission time
  name: { type: String, required: true },
  matricNumber: { type: String, required: true },
  faculty: { type: String },
  department: { type: String },
  level: { type: String },
  unit: { type: String },

  imageUrl: { type: String, required: true },
  public_id: { type: String, required: true },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  comment: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

export const ClearanceSubmission =
  mongoose.models.ClearanceSubmission ||
  mongoose.model("ClearanceSubmission", ClearanceSubmissionSchema);












export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export const Staff =
  mongoose.models.staff || mongoose.model("staff", StaffSchema);


