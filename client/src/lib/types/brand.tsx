import { imageType } from "@lib/types/featuresType";

export interface brandType {
    _id?: string;
    brand: string;
    des: string;
    createdAt?: string;
    updatedAt?: string;
    image: imageType;
    isActive?: Boolean;
    __v?: 0
}