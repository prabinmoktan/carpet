import {  Schema } from "mongoose";

export interface ISale {
    percentage: number;
    startsAt: Date;
    endsAt: Date;
}

export const SaleSchema =new Schema<ISale>(
    {
        percentage: {
            type:Number,
            min: 1,
            max: 60,
            required: true
        },
        startsAt:{
            type: Date,
            required: true
        },
        endsAt:{
            type: Date,
            required: true
        },
       
        
    },
    {
        _id: false
    }
)

// const Sale = models.Sale || model<ISale>("Sale", SaleSchema );
// export default Sale;