import { NextRequest, NextResponse } from 'next/server';
import connect from '@/database/db';  // Assuming the database connection function
import { Student } from '@/lib/models'; // Assuming your Mongoose model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const reqBody = await request.json();
    const { firstname, lastname, email, password, matric_no, department, faculty } = reqBody;

    // Validate if the required fields are present
    if (!firstname || !lastname || !email || !password || !matric_no || !department || !faculty) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user exists by email or matric_no
    const existingUserByEmail = await Student.findOne({ email });
    const existingUserByMatricNo = await Student.findOne({ matric_no });

    if (existingUserByEmail) {
      return NextResponse.json({ error: `Email ${email} is already in use` }, { status: 409 });
    }

    if (existingUserByMatricNo) {
      return NextResponse.json({ error: `Matric_no ${matric_no} is already in use` }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student user
    const newlyCreatedUser = new Student({
      firstName: firstname,
      lastName: lastname,
      email,
      password: hashedPassword,
      matric_no,
      faculty,
      department,
    });

    // Save the new user to the database
    const savedNewUser = await newlyCreatedUser.save();

    // Create JWT token
    const token = jwt.sign({ id: savedNewUser._id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });

    // Return response with token and user details
    return NextResponse.json(
      {
        message: 'User created successfully',
        success: true,
        user: {
          _id: savedNewUser._id,
          firstName: savedNewUser.firstName,
          lastName: savedNewUser.lastName,
          email: savedNewUser.email,
        },
        token, // Send the token in the response
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
