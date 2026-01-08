import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;


if(!MONGODB_URI){
    throw new Error('Please define MONGODB_URI in .env.local')
}

export const dbConnect = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}`);
        console.log('connectionInstance==>', connectionInstance.connection.host)
    } catch (error) {
        // throw Error( error as string)
        
            process.exit(1)
    }
}