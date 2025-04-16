import mongoose from "mongoose";



const ClearanceSubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  staffType: { type: String, enum: ['la', 'hod', 'faculty-officer', 'hostel'], required: true },
  imageUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  comment: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ClearanceSubmission || mongoose.model('ClearanceSubmission', ClearanceSubmissionSchema);
