import { ClearanceSubmission, Student } from '@/lib/models'; 
import { NextRequest, NextResponse } from 'next/server'; 
import connect from '@/database/db'; 
import { UploadImage } from '../../../../lib/upload-images';

export async function POST(request) {
  await connect(); // Connect to the database

  const formData = await request.formData();

  try {
    // Get the student data from the form data
    const studentName = formData.get("student_name");
    const matricNo = formData.get("matric_no");
    const department = formData.get("department");
    const faculty = formData.get("faculty");
    const level = formData.get("level");

    // Validate the data
    if (!studentName || !matricNo || !department || !faculty || !level) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Handle multiple image uploads
    const images = formData.getAll("images"); // Notice: getAll for multiple images
    if (!images || images.length === 0) {
      return NextResponse.json({ message: "No images provided" }, { status: 400 });
    }

    // Upload all images to Cloudinary
    const uploadPromises = images.map((image) => UploadImage(image, "image-upload"));
    const uploadResults = await Promise.all(uploadPromises);

    // Collect the secure URLs and public IDs
    const imageUrls = uploadResults.map((result) => result.secure_url);
    const public_ids = uploadResults.map((result) => result.public_id);

    // Save the data into the database
    await ClearanceSubmission.create({
      studentName,
      matricNo,
      department,
      faculty,
      level,
      imageUrls, // Save array of URLs
      public_ids, // Save array of public IDs
    });

    return NextResponse.json({ message: "Images and student data uploaded successfully" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
