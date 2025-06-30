import connect from "@/database/db"; 
import {  NextResponse } from "next/server";
import { Student } from "@/lib/models";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { matric_no, password } = reqBody;  // Expecting matric_no and password only
    console.log(reqBody);

    // Check if matric_no and password are provided
    if (!matric_no || !password) {
      return NextResponse.json({ message: "Please fill the fields" }, { status: 400 });
    }

    // Fetch student using matric_no
    const user = await Student.findOne({ matric_no });

    if (!user) {
      return NextResponse.json({ message: "User not found!!!" }, { status: 401 });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
    }

    // Create a JWT token
    const tokenData = { matric_no: user.matric_no };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Return student info (including full details) along with the token
    const response = NextResponse.json(
      { 
        message: "Login Successful", 
        token, 
        success: true,
        student: {
          firstName: user.firstName,
          lastName: user.lastName,
          matricNumber: user.matric_no,
          department: user.department,
          faculty: user.faculty,
          email: user.email,  // Optional: you can include email as well
        }
      },
      { status: 200 } 
    );
    
 
    // Set the token in a secure cookie
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
