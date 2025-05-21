import { NextResponse } from 'next/server';
import connect from '@/database/db.js';
import { ClearanceSubmission } from '@/lib/models.js';
import jwt from 'jsonwebtoken';


connect();

export async function GET(request) {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];


    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
   

    // Extract matric number from decoded token
    const matricNumber = decodedToken.matric_no;


    if (!matricNumber) {
      return NextResponse.json({ message: "Invalid token: matric number missing" }, { status: 401 });
    }

    // Query the clearance submission using the correct field name 'matricNo'
   const clearance = await ClearanceSubmission.findOne({ matricNo: matricNumber }); 

    if (!clearance) {
      return NextResponse.json({ message: "Clearance not found" }, { status: 404 });
    }
    // Return the clearance document
    return NextResponse.json({ clearance }, { status: 200 });

  } catch (error) {
    console.log("Error verifying token or fetching clearance:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}