
import { dbConnect } from "../database/db";
import Product from "../models/product.model";

export async  function getProductById(_id: string){
    await dbConnect();
    const product = await Product.findById(_id).lean();
   
    if(!product)return null;

    return JSON.parse(JSON.stringify(product));

}