
export type appointments = {
    _id: string;
};

export type user = {
    appointments: appointments | null;
    _id?: string;
    name?: string;
    email?: string;
    username?: string;
    confirmed?: boolean;
    __t?: string;
    __v?: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface AuthState {
    status?: string;
    token?: string;
    user?: user
}
