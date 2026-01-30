import { verifyJWT } from "@/app/admin/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const user = await verifyJWT(req);
    if(!user){
        return NextResponse.json({user: null}, {status:401})
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if(!accessToken || !refreshToken){
        console.log('no access token or refresh token')
        return NextResponse.json({status: 401})
    }
    return NextResponse.json({user});
}   