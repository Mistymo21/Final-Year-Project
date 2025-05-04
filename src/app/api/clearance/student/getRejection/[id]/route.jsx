import { NextResponse } from "next/server";
import connect from "@/database/db.js"; // Import your DB connection
import { ClearanceSubmission } from "@/lib/models.js"; // Import the model

export const GET = async (req, { params }) => {
  const { id } = params; // `id` corresponds to the student's MongoDB `_id`

  try {
    // Connect to the database
    await connect();

    // Fetch the rejection status for the student with the given `_id`
    const rejection = await ClearanceSubmission.findOne({
      _id: id, // Use the student's MongoDB `_id`
      status: "rejected", // Only fetch rejected records
    }).select("status comment"); // Only select the status and comment

    if (!rejection) {
      return NextResponse.json({ message: "No rejected record found" }, { status: 404 });
    }

    return NextResponse.json(rejection, { status: 200 });
  } catch (error) {
    console.error("Error fetching rejection:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
