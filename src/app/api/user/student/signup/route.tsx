
import connect from "@/database/db";
import {Student} from "@/lib/models";

import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstname, lastname, email, password, matric_no, department, faculty } = reqBody;

    // Validate user input
    // if (!validateInput(reqBody)) {
    //      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    //    }

    // Check if user exists by email or staff_id
    const existingUserByEmail = await Student.findOne({ email });
    const existingUserBymatric_no = await Student.findOne({ matric_no });

    if (existingUserByEmail) {
      return NextResponse.json({ error: `Email ${email} is already in use` }, { status: 409 });
    }

    if (existingUserBymatric_no) {
      return NextResponse.json({ error: `Matric_no ${matric_no} is already in use` }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newlyCreatedUser = new Student({
      firstName: firstname,
      lastName: lastname,
      email,
      password: hashedPassword,
      matric_no,
      faculty,
      department
    });

    // Save new user
    const savedNewUser = await newlyCreatedUser.save();
    console.log(savedNewUser);

    return NextResponse.json({ message: "User created successfully", success: true, savedNewUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

function validateInput(reqBody) {
  const requiredFields = ["firstname", "lastname", "email", "password", "matric_no, faculty, department"];
  return requiredFields.every((field) => reqBody[field] !== undefined && reqBody[field] !== null && reqBody[field] !== "");
}
