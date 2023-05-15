import { userType } from "./user";

export interface ChatType {
    members?: userType[];
    lastMSG?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    __v?: 0;
}