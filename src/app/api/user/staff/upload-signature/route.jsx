import { Staff } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/db";
import { UploadImage } from "../../../../../lib/upload-images";

export async function PATCH(request) {
  await connect();

  const formData = await request.formData();

  try {
    const staff_id = formData.get("staff_id");
    const image = formData.get("image");

    if (!staff_id || !image) {
      return NextResponse.json(
        { message: "Staff ID and image are required" },
        { status: 400 }
      );
    }

     console.log("staffid", staff_id)
        console.log("image", image)
        console.log("image type", typeof image)
        console.log("File is Blob", image instanceof Blob)

    const staff = await Staff.findOne({ staff_id });

    if (!staff) {
      return NextResponse.json(
        { message: "Staff not found" },
        { status: 404 }
      );
    }

    const uploadResult = await UploadImage(image, "image-upload");
    if (!uploadResult) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 }
      );
    }

    staff.signatureUrl = uploadResult.secure_url; // Updated field name
    await staff.save();

    return NextResponse.json(
      { message: "Signature uploaded successfully", staff },
      { status: 200 }
    );

  } catch (error) {
    console.error("Signature Upload Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}