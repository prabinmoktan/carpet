import { dbConnect } from "@/app/admin/lib/database/db"
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { Cart } from "@/app/admin/lib/models/cart.model";
import Product from "@/app/admin/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    await dbConnect();
    try {
        const user = await getAuthenticatedUser(req);
        if(!user){
            return NextResponse.json({success: false, message: "User not available"}, {status: 401})
        }

        const {items} = await req.json();
        let cart = await Cart.findOne({userId: user._id})
        if(!cart){
            cart = await cart.create({
                userId: user._id,
                items: []
            })  
        }
        for(const guestItem of items){
            const product = await Product.findById(guestItem.productId)
            if(!product)  continue;
            const existingItem = cart.items.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (item: any)=> item.productId.toString() === guestItem.productId
            );

            const safeQuantity = Math.min(
                guestItem.quantity, 
                product.stock
            )
            if(existingItem){
                existingItem.quantity += safeQuantity;
            }else{
                cart.items.push({
                    productId: product._id,
                    titleSnapshot: product.title,
                    priceSnapshot: product.price,
                    quantity: safeQuantity
                })
            }
        }
        await cart.save();
        return NextResponse.json({success: false, cart })

    } catch (error) {
        return NextResponse.json({
            success: false, 
            message: "server error occured while adding cart items to user", 
            error
        })
    }
}