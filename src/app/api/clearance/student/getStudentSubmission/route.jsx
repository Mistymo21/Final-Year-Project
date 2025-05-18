import connect from "@/database/db.js";
import { NextResponse } from "next/server";
import { ClearanceSubmission } from "@/lib/models.js";

// Ordered units list
const Units = [
  "Head of Department",
  "Faculty Officer",
  "Dean of Faculty",
  "Hostel Warden",
  "Director, Clinic",
  "Director of Sports",
  "Director of Works",
  "University Librarian",
  "Dean, Student Affairs",
  "Stores Officer",
  "Accountant (Students)",
  "University Alumni Association",
  "Director, CPPS (Top-Up only)",
  "Director, IOE (Sandwich only)",
  "Studio Manager",
];

// Slug to full name mapping
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

    const fullUnitName = unitSlugMap[unitSlug]; // <- removed .toLowerCase()

    if (!fullUnitName) {
      return NextResponse.json({ message: "Invalid unit" }, { status: 400 });
    }

    const index = Units.indexOf(fullUnitName);

    if (index === -1) {
      return NextResponse.json(
        { message: "Unit not found in list" },
        { status: 400 }
      );
    }

    const submission = await ClearanceSubmission.find({
      currentStageIndex: index,
    });

    return NextResponse.json({ submission }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}
