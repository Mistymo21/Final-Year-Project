import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/db";
import { Staff } from "@/lib/models.js";
import {ClearanceSubmission} from "@/lib/models.js";
export async function GET(Request, { params }) {
  const id = await params?.id;

  try {
    await connect();

    const staff = await Staff.findById(id);

    if (!staff) {
      return NextResponse.json({ message: "Staff not found" }, { status: 400 });
    }

    const submissions = await ClearanceSubmission.find({
      staff_id: id,
      status: "pending",
    });

    return NextResponse.json(
      {
        staff,
        submissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching staff", error: error.message },
      { status: 500 }
    );
  }
}