// app/api/students/info/route.js
import { NextResponse } from 'next/server';
import connect from '@/database/db';
import { Student } from '@/lib/models.js';
import jwt from 'jsonwebtoken';

export async function GET(Request){
  try {
    await connect();

    const token = Request.cookies.get("token");

    if(!token){
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return NextResponse.json({ message: `No token found, ${err}` }, { status: 401 });
    }

    const student = await Student.findOne({matric_no: decoded.matric_no});

    if(!student){
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ student }, { status: 200 });
   
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });

    
  }
}