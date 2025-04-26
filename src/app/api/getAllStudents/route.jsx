import connect from "@/database/db.js";
import {Student} from "@/lib/models.js";
import { NextResponse } from "next/server";


export async function GET(Request){
    try {
      await connect
      
      const StudentLists = await Student.find({});
      return NextResponse.json({ StudentLists }, { status: 200 });
  
  
  
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  
      
    }
  }