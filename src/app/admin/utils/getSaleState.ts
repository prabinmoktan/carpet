import { ICarpet } from '../lib/models/product.model';

export function getSaleState(product: ICarpet){
    const now =  new Date();
    if(!product.sale){
        return{
            isActive: false,
            finalPrice: product.price,
            discountAmount: 0
        }
    }
    const {percentage, startsAt, endsAt} = product.sale;

    const isActive = percentage > 0 && 
    startsAt &&
    endsAt &&
    now >= new Date(startsAt) && 
    now <= new Date(endsAt)

    if(!isActive){
        return{
            isActive: false,
            finalPrice: product.price,
            discountAmount: 0
        }
    }
    const discountAmount = Math.round((product.price * percentage) / 100)
    return {
        isActive: true,
        finalPrice: product.price - discountAmount,
        discountAmount,
      };
}