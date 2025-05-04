import connect from "@/database/db.js"
import {ClearanceSubmission} from "@/lib/models.js"



export const PATCH = async (req, { params }) => {
    const { id } = params;
    const { staffId, staffSignature } = await req.json(); // accept signature
  
    try {
      await connect();
  
      const updatedClearance = await ClearanceSubmission.findByIdAndUpdate(
        id,
        {
          status: "approved",
          reviewedBy: staffId,
          staffSignature: staffSignature, // save signature URL
        },
        { new: true }
      );
  
      if (!updatedClearance) {
        return new Response("Clearance submission not found", { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedClearance), { status: 200 });
    } catch (err) {
      return new Response("Failed to approve submission", { status: 500 });
    }
  };
  