import { imageType } from "@lib/types/featuresType";
import { reviewType } from "@lib/types/review";

export interface specificationsType {
    _id?: string;
    title?: string;
    description?: string;
}
export interface productType {
    _id?: string;
    name: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
    des?: string;
    fulldes: string;
    numofreviews?: number;
    numofview?: number;
    price?: number;
    rating?: number;
    stock?: number;
    sumOfRating?: number;
    warranty?: Boolean;
    reviews?: reviewType[];
    images: imageType[];
    isActive?: Boolean;
    specifications?: specificationsType[];
    specs?: specificationsType[];
    __v?: 0
}