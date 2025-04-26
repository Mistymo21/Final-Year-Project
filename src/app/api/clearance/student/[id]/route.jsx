import { NextResponse } from "next/server";
import connect from "@/database/db.js";
import { Student } from "@/lib/models.js";

export async function GET(Request, { params }) {
  try {
    await connect;

    const Student = await Student.findById(id);
    if (!Student)
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    return NextResponse.json({ Student }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { message: "Error while getting student details", error: error.message },
      { status: 500 }
    );
  }
}
