// app/api/student/[matricNumber]/route.js
import { NextResponse } from 'next/server';
import  connect  from '@/database/db.js'; 
import {Student} from '@/lib/models.js'; 

export async function GET(request, { params }) {
  await connect();

  const student = await Student.findOne({ matricNumber: params.matricNumber });

  if (!student) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json(student);
}
