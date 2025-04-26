import { NextResponse } from "next/server"
import connect from "@/database/db.js"
import {Staff} from "@/lib/models.js"

export async function GET(Request){

    try {
        await connect()

        const staffList = await Staff.find();
        
        return NextResponse.json(staffList, {status: 200})

        
    } catch (error) {
        console.log(error)
        NextResponse.json({message:"Failed to fetch staff info"}, {status:500})
        
    }
}