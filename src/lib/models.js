import mongoose from "mongoose";

// Define the schema for student
const studentSchema = new mongoose.Schema({
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
    required: [true, 'Matric number is required'],
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
  department:{
    type: String,
    required: true
  },
  faculty:{
    type: String,
    required: true
  },
 
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
}, { timestamps: true });






const StaffSchema = new mongoose.Schema({
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
    unit: {
      type: String,
      enumerator: ["Hod", "Faculty Officer", "Level adviser"],
      required: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  }, { timestamps: true });
  
  export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);


  export const Staff = mongoose.models.staff || mongoose.model("staff", StaffSchema);

