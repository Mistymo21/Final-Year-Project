import connect from "@/database/db.js"
import { NextResponse } from "next/server";
import {ClearanceSubmission} from "@/lib/models.js"


export async function GET(req){
    try {
        connect();
        const submission = await ClearanceSubmission.find({})

        if(!submission){
            return NextResponse.json({message: "No student found!...."}, {status:404})
        }

        return NextResponse.json({submission}, {status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error Occured"},{status: 500})
        
    }
}