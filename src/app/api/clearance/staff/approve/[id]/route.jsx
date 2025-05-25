import { NextResponse } from "next/server";
import connect from "@/database/db";
import { ClearanceSubmission, Staff } from "@/lib/models";

export async function PATCH(request, { params }) {
  await connect();

  const { id } = params;


  try {
    const body = await request.json();
    const { unit } = body;

    

    if (!unit) {
      return NextResponse.json({ message: "Unit is required" }, { status: 400 });
    }

    // Find staff by unit
    const staff = await Staff.findOne({ unit });
    if (!staff || !staff.signatureUrl) {
      return NextResponse.json({ message: "Staff or signature not found for unit" }, { status: 404 });
    }

    // Fetch student
    const student = await ClearanceSubmission.findById(id);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const currentIndex = student.currentStageIndex;
    const clearanceHistory = student.clearanceHistory || [];

    if (
      clearanceHistory.length === 0 ||
      currentIndex === undefined ||
      currentIndex < 0 ||
      currentIndex >= clearanceHistory.length
    ) {
      return NextResponse.json({ message: "Invalid clearance stage index." }, { status: 400 });
    }

    const staffUnit = clearanceHistory[currentIndex].unit;

    // Approve current stage
    clearanceHistory[currentIndex].status = "approved";
    clearanceHistory[currentIndex].comment = `Approved by ${staffUnit}`;
    clearanceHistory[currentIndex].reviewedBy = `${staff.firstName} ${staff.lastName}`;
    clearanceHistory[currentIndex].staffSignature = staff.signatureUrl;
    clearanceHistory[currentIndex].signaturePublicId = staff.signaturePublicId || null;
    clearanceHistory[currentIndex].updatedAt = new Date();

    // Move to next stage
    const isLastStage = currentIndex >= clearanceHistory.length - 1;
    student.currentStageIndex = isLastStage ? currentIndex : currentIndex + 1;
    student.clearanceHistory = clearanceHistory;

    await student.save();

    return NextResponse.json(
      {
        message: `Student approved by ${unit}`,
        data: student,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Approval Error:", error.stack || error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
