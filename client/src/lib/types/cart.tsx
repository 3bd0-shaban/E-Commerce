import { productType } from "./product";

export interface cartItem {
    created: string;
    quentity: number;
    _id: string;
    product_Id: productType;
}
export interface cartType {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    items: cartItem[];
    numofitems?: number;
    user?: string;
    __v?: 0
}