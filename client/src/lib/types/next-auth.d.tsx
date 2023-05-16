import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { userType } from './user';

type UserId = string

declare module 'next-auth/jwt' {
    interface JWT {
        user: userType;
        token: string;
        role?: string;
        status: string;
        isAdmin?: boolean;
    }
}

declare module 'next-auth' {
    interface Session {
        user: userType;
        token: string;
        isAdmin?: boolean;
        status: string;
    }
    interface User {
        user: userType;
        token: string;
        isAdmin: boolean;
        status: string;
    }
}
