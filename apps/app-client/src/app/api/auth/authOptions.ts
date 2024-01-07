import axios from 'axios';
import { Session, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication`;

async function refreshToken(token: JWT): Promise<JWT> {
    const { data } = await axios.get(BASE_URL + '/auth/refresh', {
        headers: {
            authorization: `Bearer ${token.refreshToken}`
        }
    });

    return {
        ...token,
        ...data
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'user@example.com' },
                password: { label: 'Password', type: 'password', placeholder: 'password' }
            },
            async authorize(credentials, req) {
                try {
                    const { data, status } = await axios.post(`${BASE_URL}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password
                    });
                    console.log({ data, status });

                    if (status === 201 && data) {
                        return data;
                    }
                } catch (error) {
                    console.error(error);
                }
                return null;
            }
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                const expiry = new Date().getTime() + 60 * 60 * 1000;
                delete token.error;
                return { ...token, ...user, expiry };
            } else if (Date.now() < token.expiry) {
                delete token.error;
                return token;
            } else {
                try {
                    const newToken = await refreshToken(token);
                    const expiry = new Date().getTime() + 60 * 60 * 1000;
                    return { ...token, ...newToken, expiry };
                } catch (error) {
                    console.error(error);
                    return { ...token, error: 'RefreshAccessTokenError' as const };
                }
            }
        },

        async session({ token, session }: { token: JWT; session: Session }) {
            const { id, name, email, accessToken, refreshToken, error } = token;
            session.user = { id, name, email };
            session.tokens = {
                accessToken,
                refreshToken
            };
            session.error = error;

            return session;
        },
        redirect(params) {
            return params.url;
        }
    },
    pages: {
        signIn: `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`
    }
};
