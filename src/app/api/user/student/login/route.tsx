import  connect  from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import {Student} from "@/lib/models";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connect();
export async function POST(request: NextRequest) {
  try {
    //Fetch User req from the body
    const reqBody = await request.json();
    const { matric_no, password } = reqBody;
    console.log(reqBody)

    //Check if all field are filled
    if (!matric_no || !password) {
      return NextResponse.json(
        { message: "Please fill the fields" },
        { status: 400 }
      );
    }

  

    //check if user exists

    const user = await Student.findOne({ matric_no });

    if (!user) {
      return NextResponse.json(
        { messaage: "User not found!!!" },
        { status: 401 }
      );
    }

    // Validate Password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    // Create a jwt token
    const tokenData = {
      id: user.matric_no,
    };

    //Creating A token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log(token);
    const response = NextResponse.json(
      { message: "Login Successful", token, success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;

    
  } catch (error) {
    console.log("Try Again", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
  
}
