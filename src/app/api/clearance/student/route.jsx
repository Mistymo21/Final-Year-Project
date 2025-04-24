
import { ClearanceSubmission } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/database/db';
import { UploadImage } from '../../../../lib/upload-images';


export async function POST( request) {
  await connect();

  const formData = await request.formData();

  try {
    const image = formData.get("image") 

   if (!image) {
      return NextResponse.json({ message: "No image provided" }, { status: 400 });
    }
  const uploadResult = await UploadImage(image, "image-upload");

  console.log("Image: ", uploadResult);
   await ClearanceSubmission.create({
    imageUrl: uploadResult.secure_url, 
    public_id: uploadResult.public_id,
  });
  

   return NextResponse.json({ message: "Image uploaded successfully" }, { status: 200 });

  

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    
  }
}