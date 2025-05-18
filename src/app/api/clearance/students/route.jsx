import { NextResponse } from "next/server";
import connect from "@/database/db";
import { ClearanceSubmission } from "@/lib/models";

export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const unit = searchParams.get("unit");

  if (!unit) {
    return NextResponse.json({ message: "Unit is required" }, { status: 400 });
  }

  try {
    const students = await ClearanceSubmission.find({
      status: "in_progress",
      $expr: {
        $eq: [
          { $arrayElemAt: ["$clearanceHistory.unit", "$currentStageIndex"] },
          unit,
        ],
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}