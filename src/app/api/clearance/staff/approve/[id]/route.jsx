import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/db";
import { UploadImage } from "@/lib/upload-images";
import { ClearanceSubmission } from "@/lib/models";

export async function PATCH(request, { params }) {
  await connect();

  const { id } = params;

  try {
    const formData = await request.formData();
    const signature = formData.get("signature");
    const reviewedBy = formData.get("reviewedBy");

    if (!signature || typeof signature === "string") {
      return NextResponse.json(
        { message: "Signature file is required" },
        { status: 400 }
      );
    }

    const uploadedSignature = await UploadImage(signature, "image-upload");

    const student = await ClearanceSubmission.findById(id);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const currentIndex = student.currentStageIndex;
    const clearanceHistory = student.clearanceHistory || [];

    if (clearanceHistory.length === 0) {
      return NextResponse.json(
        { message: "Clearance history is empty." },
        { status: 400 }
      );
    }

    if (currentIndex < 0 || currentIndex >= clearanceHistory.length) {
      return NextResponse.json(
        { message: "Invalid clearance stage index." },
        { status: 400 }
      );
    }

    // Get unit name for dynamic comment
    const staffUnit = clearanceHistory[currentIndex].unit;

    // Update current clearance stage
    clearanceHistory[currentIndex].status = "approved";
    clearanceHistory[currentIndex].comment = `Approved by ${staffUnit}`;
    clearanceHistory[currentIndex].reviewedBy = reviewedBy || "Unknown Staff";
    clearanceHistory[currentIndex].staffSignature = uploadedSignature.secure_url;
    clearanceHistory[currentIndex].signaturePublicId = uploadedSignature.public_id;
    clearanceHistory[currentIndex].updatedAt = new Date();

    // Move to next stage if any
    const isLastStage = currentIndex >= clearanceHistory.length - 1;
    const newStageIndex = isLastStage ? currentIndex : currentIndex + 1;

    // Update main student record
    student.clearanceHistory = clearanceHistory;
    student.currentStageIndex = newStageIndex;

    await student.save();

    return NextResponse.json(
      { message: "Student approved and moved to next stage", data: student },
      { status: 200 }
    );

  } catch (error) {
    console.error("Approval Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}