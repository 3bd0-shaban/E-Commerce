import { imageType } from "@lib/types/featuresType";
import { productType } from "./product";
import { userType } from "./user";

export interface reviewType {
    user?: userType;
    product?: productType;
    comment?: string;
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    __v?: string;
}