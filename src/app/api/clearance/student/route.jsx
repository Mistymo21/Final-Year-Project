import connect from "@/database/db";
import { NextResponse } from "next/server";
import ClearanceSubmission from "@/models/ClearanceSubmission";

export async function POST(request) {
  await connect();

  try {
    const reqBody = await request.json();
    const { imageUrl, student_id, staffType } = reqBody;

    if (!imageUrl || !student_id || !staffType) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    //Prevent duplicate submission
    const alreadySubmitted = await ClearanceSubmission.findOne({
      student: student_id,
      staffType,
    });

    if (alreadySubmitted) {
      return NextResponse.json(
        { message: `Already submitted for ${staffType}` },
        { status: 409 }
      );
    }

    // Create new submission
    const submission = await ClearanceSubmission.create({
      student: student_id,
      staffType,
      imageUrl,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Submission successful", submission },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
