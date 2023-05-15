import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
const url = process.env.NEXT_PUBLIC_API_KEY;

interface credentialsProps {
    email: string;
    password: string;
}

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_ID
    const clientSecret = process.env.GOOGLE_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return { clientId, clientSecret }
}
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    // adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials?: Record<"email" | "password", string>) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('invalid credentials')
                }

                const { email, password } = credentials;

                const res = await fetch(url + "/api/auth/signin", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
                const user = await res.json();
                if (!res.ok) {
                    throw new Error(user.message);
                }
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                }

                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],

    //
    // 



    /** account:
     * @example
     *  {
         providerAccountId: undefined,
         type: 'credentials',
         provider: 'credentials'
        }
    *
     * user is the response when user make login request otherwise it's undefined
     * @example
        {
            status:'success',
            token:'token-here,
            user:user-properties-here,
        }
     * token is the values we declared in next-auth.d.tsx {token,user,role} with values {iat,exp,jti} which is decripted from the JWT token recived from server;
     * @param {
     *      token.token
            token.user 
            token.role 
     * }
     * Some form decripting JWT
     * {iat,exp,jti}
     */

    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.token = user.token
                token.user = user.user
                token.role = user.user.__t
            }

            return token

        },

        async session({ session, token }) {

            session.token = token.token
            session.user = token.user
            session.isAdmin = token.user.isAdmin
            return session
        },
        async redirect({ url, baseUrl }) {
            return '/'
        },
    },
}

export default NextAuth(authOptions)