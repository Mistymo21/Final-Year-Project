import connect from "@/database/db.js";
import { ClearanceSubmission } from "@/lib/models.js";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { comment, unit, reviewerName } = await req.json();  // use 'unit' instead of staffId

  try {
    await connect();

    const clearance = await ClearanceSubmission.findById(id);
    if (!clearance) {
      return new Response("Clearance submission not found", { status: 404 });
    }

    const historyIndex = clearance.clearanceHistory.findIndex(
      (item) => item.unit === unit  // find by unit
    );

    if (historyIndex === -1) {
      return new Response("Staff clearance unit not found", { status: 404 });
    }

    // Update the relevant unit's clearance entry
    clearance.clearanceHistory[historyIndex].status = "rejected";
    clearance.clearanceHistory[historyIndex].comment = comment;
    clearance.clearanceHistory[historyIndex].reviewedBy = reviewerName || "";
    clearance.clearanceHistory[historyIndex].staffSignature = "";

    // Optional: Set the global clearance status
    clearance.status = "rejected";

    await clearance.save();

    return new Response(JSON.stringify(clearance), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to reject submission", { status: 500 });
  }
};