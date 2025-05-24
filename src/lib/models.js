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
    profileImageUrl: {
      type: String,
      default: "",
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
      enumerator: [
        "Head of Department",
        "Faculty Officer",
        "Dean of Faculty",
        "Hostel Warden",
        "Director, Clinic",
        "Director of Sports",
        "Director of Works",
        "University Librarian",
        "Dean, Student Affairs",
        "Stores Officer",
        "Accountant (Students)",
        "University Alumni Association",
        "Director, CPPS (Top-Up only)",
        "Director, IOE (Sandwich only)",
        "Studio Manager",
      ],
      required: true,
    },
    signatureUrl: {
      type: String,
      default: "",

    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const ClearanceStageSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enumerator: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviewedBy: String,
  comment: String,
  staffSignature: String,
  
},{ timestamps: true });

const ClearanceSubmissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    matricNo: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    public_ids: {
      type: [String],
      required: true,
    },
    currentStageIndex: {
      type: Number,
      default: 0, // Starts from the first staff in the chain
    },
    clearanceHistory: {
      type: [ClearanceStageSchema], // Full clearance progress
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "approved", "rejected"],
      default: "pending",
    },
    lastRejectedBy: String,
    rejectionReason: String,
    staff_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
export const ClearanceSubmission =
  mongoose.models.ClearanceSubmission ||
  mongoose.model("ClearanceSubmission", ClearanceSubmissionSchema);

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export const Staff =
  mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
