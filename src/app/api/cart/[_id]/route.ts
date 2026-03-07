import { dbConnect } from "@/app/admin/lib/database/db"

export const DELETE = async() => {

    await dbConnect();
    

}