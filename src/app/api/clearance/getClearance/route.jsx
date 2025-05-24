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

    // Find all clearance records for this student
    const records = await ClearanceSubmission.find({ matricNo });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { message: "No clearance data found" },
        { status: 404 }
      );
    }

    // Return full array of clearance records
    return NextResponse.json(records);
  } catch (error) {
    console.error("Clearance fetch error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}