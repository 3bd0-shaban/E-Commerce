import { userType } from "@lib/types/user";
import { addressType } from "./address";
import { productType } from "./product";

export interface specificationsType {
    _id?: string;
    title?: string;
    description?: string;
}
export interface orderType {
    _id?: string;
    name: string;
    address?: addressType;
    user?: userType;
    orderitems: {
        createdAt: string;
        product: productType;
        quentity: number;
        _id: string;
    }[];
    CashOnDelivery?: boolean;
    PhoneNumber?: string;
    status?: 'Processing' | 'Not processed' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalPrice?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: 0
}