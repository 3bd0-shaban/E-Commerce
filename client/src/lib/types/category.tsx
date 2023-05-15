import { imageType } from "@lib/types/featuresType";

export interface subCategoryType {
    nameOfSub?: string;
    _id?: string;
}
export interface categoryType {
    _id?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
    des?: string;
    image?: imageType;
    isActive?: Boolean;
    subcategory: subCategoryType[];
    __v?: 0
}