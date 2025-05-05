import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/db";
import { UploadImage } from "@/lib/upload-images";
import { ClearanceSubmission } from "@/lib/models";

export async function PATCH(request, { params }) {
  await connect();

  const { studentId } = params;

  try {
    const formData = await request.formData();

    const signature = formData.get("signature");
    const reviewedBy = formData.get("reviewedBy");

    if (!signature || typeof signature === "string") {
      return NextResponse.json({ message: "Signature file is required" }, { status: 400 });
    }

    // Upload the signature
    const uploadedSignature = await UploadImage(signature, "image-upload");

    // Update the clearance submission
    const updated = await ClearanceSubmission.findByIdAndUpdate(
      studentId,
      {
        status: "approved",
        signatureUrl: uploadedSignature.secure_url,
        signaturePublicId: uploadedSignature.public_id,
        reviewedBy: reviewedBy || "Unknown Staff",
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student approved successfully", data: updated }, { status: 200 });

  } catch (error) {
    console.error("Approval Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
