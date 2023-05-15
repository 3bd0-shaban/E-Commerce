import { userType } from "./user";

export interface addressType {
    _id?: string;
    PhoneNumber: number;
    city?: string;
    country?: string;
    state?: string;
    zipCode?: string;
    user?: userType;
    createdAt?: string;
    updatedAt?: string;
    __v?: 0
}