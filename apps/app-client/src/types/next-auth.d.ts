import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: User;

        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }

    interface User {
        id: number;
        email: string;
        name: string;
    }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        id: number;
        email: string;
        name: string;
        accessToken: string;
        refreshToken: string;
    }
}
