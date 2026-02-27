import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const user = await getAuthenticatedUser();
    if(!user){
        return NextResponse.json({user: null}, {status:401})
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if(!accessToken || !refreshToken){
     
        return NextResponse.json({status: 401})
    }
    return NextResponse.json({user});
}   