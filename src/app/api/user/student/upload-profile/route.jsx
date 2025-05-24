import { Student } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/db";
import { UploadImage } from "../../../../../lib/upload-images";
import { format } from "path";

export async function PATCH(request) {
  await connect();

  const formData = await request.formData();

  try {
    const matric_no = formData.get("matric_no");
    const image = formData.get("image");

    if (!matric_no || !image) {
      return NextResponse.json(
        { message: "matric number and image are required" },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ matric_no: matric_no || formData("matricNumber") });

    if (!student) {
      return NextResponse.json(
        { message: "student not found" },
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

    student.profileImageUrl = uploadResult.secure_url; // Updated field name
    await student.save();

    return NextResponse.json(
      { message: "Profile Image uploaded successfully", student },
      { status: 200 }
    );

  } catch (error) {
    console.error("Profile Image Upload Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}