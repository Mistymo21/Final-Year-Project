import { NextResponse } from "next/server";
import connect from "@/database/db.js";
import { ClearanceSubmission } from "@/lib/models.js";

// GET /api/clearance/student/[matricNo]
export async function GET(req, { params }) {
  const matricNo = decodeURIComponent(params.matricNo); // decode to handle slashes

  await connect();

  try {
    const clearance = await ClearanceSubmission.findOne({ matricNo });

    if (!clearance) {
      return NextResponse.json(
        { message: "Clearance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: clearance.status,
        clearanceHistory: clearance.clearanceHistory || []
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching clearance:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}