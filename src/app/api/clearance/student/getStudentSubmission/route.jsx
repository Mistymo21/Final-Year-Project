import connect from "@/database/db.js";
import { NextResponse } from "next/server";
import { ClearanceSubmission } from "@/lib/models.js";

const unitSlugMap = {
  HOD: "Head of Department",
  FO: "Faculty Officer",
  DOF: "Dean of Faculty",
  HW: "Hostel Warden",
  DC: "Director, Clinic",
  DOS: "Director of Sports",
  DOW: "Director of Works",
  UL: "University Librarian",
  DSS: "Dean, Student Affairs",
  SO: "Stores Officer",
  AS: "Accountant (Students)",
  UAA: "University Alumni Association",
  DCPPS: "Director, CPPS (Top-Up only)",
  DIOE: "Director, IOE (Sandwich only)",
  SM: "Studio Manager",
};

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const unitSlug = searchParams.get("unit");

    if (!unitSlug) {
      return NextResponse.json(
        { message: "Unit not provided" },
        { status: 400 }
      );
    }

    const fullUnitName = unitSlugMap[unitSlug];

    if (!fullUnitName) {
      return NextResponse.json({ message: "Invalid unit" }, { status: 400 });
    }

    // Get all submissions where the current clearance stage's unit matches the staff's unit
    const allSubmissions = await ClearanceSubmission.find();

    // Filter only those whose current clearance stage matches this staff unit
    const filtered = allSubmissions.filter((submission) => {
      const currentStage = submission.clearanceHistory[submission.currentStageIndex];
      return currentStage && currentStage.unit === fullUnitName;
    });

    // Calculate counts from filtered submissions
    
    
  const total = filtered.length;

const approved = filtered.filter((s) =>
  s.clearanceHistory.some(
    (h) => h.unit === fullUnitName && h.status === "approved"
  )
).length;

const rejected = filtered.filter((s) =>
  s.clearanceHistory.some(
    (h) => h.unit === fullUnitName && h.status === "rejected"
  )
).length;

const pending = filtered.filter((s) =>
  s.clearanceHistory.some(
    (h) => h.unit === fullUnitName && h.status === "pending"
  )
).length;

    return NextResponse.json(
      {
        total,
        approved,
        rejected,
        pending,
        submission: filtered, // only send filtered submissions to frontend
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}