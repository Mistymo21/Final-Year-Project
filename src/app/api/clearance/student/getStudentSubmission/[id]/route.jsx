// app/api/clearance/student/getStudentSubmission/[id]/route.js

import { NextResponse } from "next/server";
import connect from "@/database/db";
import { ClearanceSubmission } from "@/lib/models";

export async function GET(request, { params }) {
    const id = await params?.id;
  try {
    await connect();

    const studentSubmission = await ClearanceSubmission.findById(id);

    if (!studentSubmission) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(studentSubmission, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}
