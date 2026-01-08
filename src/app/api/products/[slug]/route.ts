import { dbConnect } from "@/app/admin/lib/database/db"
import Product from "@/app/admin/lib/models/product.model";
import { NextResponse } from "next/server";

export const GET = async(req: Request, {params}: {params: Promise<{slug: string}>})=> {
    await dbConnect();
    try {
        const {slug}  = await params;
        console.log('params==>',slug)
        if(!slug){
            return NextResponse.json({success: false, message: 'invalid id/id is missing'})
        }
        const product = await Product.findById(slug);
        console.log(product)
        return NextResponse.json({success: true, message: 'data fetched successfully', product}, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false, message: 'server error occured while  fetching data', error}, {status: 500});
    }
}