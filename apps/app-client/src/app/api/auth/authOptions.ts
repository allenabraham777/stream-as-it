import axios from 'axios';
import { Session, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'user@example.com' },
                password: { label: 'Password', type: 'password', placeholder: 'password' }
            },
            async authorize(credentials, req) {
                const { data, status } = await axios.post('http://localhost:8000/auth/login', {
                    email: credentials?.email,
                    password: credentials?.password
                });

                if (status === 201 && data) {
                    return data;
                }
                return null;
            }
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) return { ...token, ...user };
            return token;
        },

        async session({ token, session }: { token: JWT; session: Session }) {
            const { id, name, email, accessToken, refreshToken } = token;
            session.user = { id, name, email };
            session.tokens = {
                accessToken,
                refreshToken
            };

            return session;
        }
    },
    pages: {
        signIn: '/login'
    }
};
