import  connect  from "@/database/db";
import {Staff} from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { staff_id, password, unit } = reqBody;
    console.log(reqBody);

    // Validate user input
    if (!staff_id || !password || !unit) {
      return NextResponse.json(
        { message: "Please fill in all required fields" },
        { status: 400 }
      )
    }

    //Check if user exists
    const user = await Staff.findOne({ staff_id });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 401 }
      );
    }

    // Check Password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    //Creating a token Data with the jwt

    const tokenData = {
      id: user.staff_id,
      unit: user.unit, 
      
    };

    // Creating a token 
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const response = NextResponse.json(
      {
        message: "Login Successful",
        token,
        success: true,
        staff: {
          staff_id: user.staff_id,
          unit: user.unit,
          faculty: user.faculty,
          firstName: user.firstName, 
          lastName: user.lastName,
          _id: user._id,
        },
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {httpOnly: true});
    return response;


    


  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
