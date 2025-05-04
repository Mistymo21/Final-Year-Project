import  connect  from "@/database/db.js";
import {ClearanceSubmission} from "@/lib/models.js";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { comment, staffId } = await req.json();

  try {
    await connect();

    const updatedClearance = await ClearanceSubmission.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        comment: comment,
        reviewedBy: staffId,
      },
      { new: true }
    );

    if (!updatedClearance) {
      return new Response("Clearance submission not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedClearance), { status: 200 });
  } catch (err) {
    return new Response("Failed to reject submission", { status: 500 });
  }
};
