import axios from "axios"


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const fetchProduct = async(id: string) => {
    const response = await axios.get(`${baseUrl}/products/${id}`)

    return response.data;

}