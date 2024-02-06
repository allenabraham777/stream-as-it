'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Label,
    Input,
    CardFooter,
    Button,
    CardContent
} from '@stream-as-it/ui';

interface Props {}

const Login = (props: Props) => {
    const dataRef = useRef({ email: '', password: '' });

    const submit = () => {
        if (!dataRef.current.email || !dataRef.current.password) return;

        signIn('credentials', {
            email: dataRef.current.email,
            password: dataRef.current.password,
            redirect: true,
            callbackUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/dashboard`
        });
    };

    const loginAsGuest = () => {
        signIn('credentials', {
            email: 'guest@example.com',
            password: 'Test@1234',
            redirect: true,
            callbackUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/dashboard`
        });
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-primary">Login to your account</CardTitle>
                <CardDescription>Enter your details below to login to your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        onChange={(e) => {
                            dataRef.current.email = e.target.value;
                        }}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="p@ssw0rd"
                        onChange={(e) => {
                            dataRef.current.password = e.target.value;
                        }}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 w-full">
                    <Button className="w-full" onClick={submit}>
                        Login
                    </Button>
                    <Button
                        className="w-full bg-transparent hover:bg-transparent border border-primary text-primary"
                        onClick={loginAsGuest}
                    >
                        Login as guest
                    </Button>
                </div>
                <div className="w-full">
                    Do not have an account?{' '}
                    <Link href="/signup">
                        <Button variant="link" className="px-0">
                            Create account.
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Login;
