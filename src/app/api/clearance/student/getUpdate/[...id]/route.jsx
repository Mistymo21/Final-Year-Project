import { NextResponse } from "next/server";
import connect from "@/database/db.js";
import { ClearanceSubmission } from "@/lib/models.js";

export async function GET(request, { params }) {
  const matricNo = decodeURIComponent(params.id.join("/"));

  try {
    await connect();

    const clearance = await ClearanceSubmission.findOne({ matricNo });

    if (!clearance) {
      return NextResponse.json({ message: "Clearance not found" }, { status: 404 });
    }

    return NextResponse.json(clearance, { status: 200 });

  } catch (error) {
    console.error("Error fetching clearance:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}