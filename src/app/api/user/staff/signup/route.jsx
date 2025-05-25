import  connect  from "@/database/db";
import {Staff} from "@/lib/models";
import jwt from "jsonwebtoken";
import {  NextResponse } from "next/server";
import bcrypt from "bcrypt";



export async function POST(request) {
  try {
    await connect();
    const reqBody = await request.json();
    const { firstname, lastname, email, password, unit, staff_id, faculty } = reqBody;

    // Validate user input
    if (!validateInput(reqBody)) {
      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    }

    // Check if user exists by email or staff_id
    const existingUserByEmail = await Staff.findOne({ email });
    const existingUserByStaffId = await Staff.findOne({ staff_id });

    if (existingUserByEmail) {
      return NextResponse.json({ error: `Email ${email} is already in use` }, { status: 409 });
    }

    if (existingUserByStaffId) {
      return NextResponse.json({ error: `Staff ID ${staff_id} is already in use` }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newlyCreatedUser = new Staff({
      firstName: firstname,
      lastName: lastname,
      email,
      password: hashedPassword,
      unit,
      staff_id,
      faculty, 
    });

    // Save new user
    const savedNewUser = await newlyCreatedUser.save();

    const token = jwt.sign({id: savedNewUser._id}, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    console.log(token)

    
   return NextResponse.json(
         {
           message: 'User created successfully',
           success: true,
           user: {
             _id: savedNewUser._id,
             firstName: savedNewUser.firstName,
             lastName: savedNewUser.lastName,
             unit: savedNewUser.unit,
             email: savedNewUser.email,
             staff_id: savedNewUser.staff_id,
           },
           token, // Send the token in the response
         },
         { status: 201 }
       );
  } catch (error) {
    console.error(error);
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

function validateInput(reqBody) {
  const requiredFields = ["firstname", "lastname", "email", "password", "unit", "staff_id", "faculty", "confirm_password"];
  return requiredFields.every((field) => reqBody[field] !== undefined && reqBody[field] !== null && reqBody[field] !== "");
}

