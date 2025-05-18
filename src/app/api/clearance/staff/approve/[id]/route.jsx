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
      return NextResponse.json({ message: "Signature file is required" }, { status: 400 });
    }

    const uploadedSignature = await UploadImage(signature, "image-upload");

    const student = await ClearanceSubmission.findById(id);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const currentIndex = student.currentStageIndex;
    const clearanceChain = student.clearanceChain || [];

    // Ensure current stage exists
    if (!clearanceChain[currentIndex]) {
      return NextResponse.json({ message: "Invalid clearance stage." }, { status: 400 });
    }

    // Update current stage with approval
    clearanceChain[currentIndex].status = "approved";
    clearanceChain[currentIndex].comment = "Approved by staff";
    clearanceChain[currentIndex].reviewedBy = reviewedBy || "Unknown Staff";
    clearanceChain[currentIndex].timestamp = new Date();

    // Move to next stage if any
    const isLastStage = currentIndex >= clearanceChain.length - 1;
    const newStageIndex = isLastStage ? currentIndex : currentIndex + 1;

    // Update student record
    student.clearanceChain = clearanceChain;
    student.currentStageIndex = newStageIndex;
    student.staffsignature = uploadedSignature.secure_url;
    student.staffsignaturePublicId = uploadedSignature.public_id;

    await student.save();

    return NextResponse.json(
      { message: "Student approved and moved to next stage", data: student },
      { status: 200 }
    );

  } catch (error) {
    console.error("Approval Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}