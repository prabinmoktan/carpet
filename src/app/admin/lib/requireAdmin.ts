
import { getAuthenticatedUser } from "./getAuthenticatedUser"

export const requireAdmin= async() => {
    const user = await getAuthenticatedUser();
   
    if(!user)return null;
    if(user?.role !== 'admin')return null;
    return user;
}