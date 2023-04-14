import { imageType } from "@lib/types/featuresType";

export interface bannerType {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    banners: imageType;
    isSide?: Boolean;
    isTop?: Boolean;
    __v?: 0
}