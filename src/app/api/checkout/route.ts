import { dbConnect } from "@/app/admin/lib/database/db"
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest)=> {
    dbConnect();
    try {
        const user = await getAuthenticatedUser();
        if(!user){
            return NextResponse.json({success: false, message: "user not available. Login again"},{status: 401})
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "server error occured while checking out the price", 
            error
        }, {
            status: 500
        })
    }
}