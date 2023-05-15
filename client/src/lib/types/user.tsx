import { imageType } from "./featuresType";

export type appointments = {
    _id: string;
};

export type userType = {
    _id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    username?: string;
    phone?: string;
    isAdmin?: boolean;
    image:imageType;
    confirmed?: boolean;
    __t?: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
};

export interface AuthState {
    status?: string;
    token?: string;
    user?: userType
}
