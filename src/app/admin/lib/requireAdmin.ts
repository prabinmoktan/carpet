
import { getAuthenticatedUser } from "./getAuthenticatedUser"

export const requireAdmin= async() => {
    const user = await getAuthenticatedUser();
    console.log('user from requireadmin', user)
    if(!user)return null;
    if(user?.role !== 'admin')return null;
    return user;
}