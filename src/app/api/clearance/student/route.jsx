import { ClearanceSubmission, Student, Staff } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/db";
import { UploadImage } from "../../../../lib/upload-images";

export async function POST(request) {
  await connect();

  const formData = await request.formData();

  try {
    const studentName = formData.get("student_name");
    const matricNo = formData.get("matric_no");
    const department = formData.get("department");
    const faculty = formData.get("faculty");
    const level = formData.get("level");
    const staff_id = formData.get("staff_id");

    if (!studentName || !matricNo || !department || !faculty || !level) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ matric_no: matricNo });
    const staff = await Staff.findOne({ staff_id });

    if (!student || !staff) {
      return NextResponse.json(
        { message: "Invalid student or staff" },
        { status: 404 }
      );
    }

    const existingSubmission = await ClearanceSubmission.findOne({ matricNo });

    if (existingSubmission && existingSubmission.status !== "rejected") {
      return NextResponse.json(
        {
          message:
            "You have already submitted. You can only re-upload if your previous submission was rejected.",
        },
        { status: 400 }
      );
    }

    const images = formData.getAll("images");
    if (!images || images.length === 0) {
      return NextResponse.json(
        { message: "No images provided" },
        { status: 400 }
      );
    }

    const uploadPromises = images.map((image) =>
      UploadImage(image, "image-upload")
    );
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((r) => r.secure_url);
    const public_ids = uploadResults.map((r) => r.public_id);

    const clearanceUnits = [
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
    ];

    const clearanceHistory = clearanceUnits.map((unit) => ({
      unit,
      status: "pending",
      reviewedBy: "",
      comment: "",
      staffSignature: "",
      updatedAt: null,
    }));

    if (existingSubmission && existingSubmission.status === "rejected") {
      await ClearanceSubmission.findByIdAndUpdate(existingSubmission._id, {
        studentName,
        department,
        faculty,
        level,
        staff_id,
        imageUrls,
        public_ids,
        status: "pending",
        clearanceHistory,
        currentStageIndex: 0,
        lastRejectedBy: "",
        rejectionReason: "",
      });

      return NextResponse.json(
        { message: "Re-submission after rejection successful" },
        { status: 200 }
      );
    }

    await ClearanceSubmission.create({
      studentName,
      matricNo,
      department,
      faculty,
      level,
      staff_id,
      imageUrls,
      public_ids,
      status: "in_progress",
      clearanceHistory,
      currentStageIndex: 0,
    });

    return NextResponse.json(
      { message: "Clearance submission successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Clearance Submission Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
