import connect from "@/database/db.js";
import { NextResponse } from "next/server";
import { ClearanceSubmission } from "@/lib/models.js";

export async function GET(Request) {
  const { searchParams } = new URL(Request.url);
  const matricNo = searchParams.get("matricNo");

  if (!matricNo) {
    return NextResponse.json(
      { message: "Matric number is required" },
      { status: 400 }
    );
  }
  try {
    await connect();

    const record = await ClearanceSubmission.findOne({ matricNo });
    if (!record) {
      return NextResponse.json(
        { message: "No clearance data found" },
        { status: 404 }
      );
    }

    const {
      reviewedBy,
      studentName,
      department,
      faculty,
      staffsignature,
      updatedAt,
      status,
      comment,
    } = record;

    return NextResponse.json({
      reviewedBy,
      status,
      staffsignature,
      comment,
      studentName,
      department,
      faculty,
      updatedAt,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
