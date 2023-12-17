'use client';
import React, { useState } from 'react';
import Link from 'next/link';

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

import { useRegister } from '@/hooks/auth/useRegister';
import { useRouter } from 'next/navigation';

interface Props {}

const SignUp = (props: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useRegister();
    const router = useRouter();

    const submit = () => {
        if (!email || !password || !name || !account) {
            alert('Please enter information');
        } else {
            register(account, email, name, password).then(() => router.push('/login'));
        }
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-primary">Create an account</CardTitle>
                <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="account_name">Account User Name</Label>
                    <Input
                        id="account_name"
                        type="text"
                        placeholder="Account Name"
                        value={account}
                        onChange={({ target: { value } }) => setAccount(value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Jack Daniel"
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={({ target: { value } }) => setEmail(value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="p@ssw0rd"
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={submit}>
                    Create account
                </Button>
                <div className="w-full">
                    Already have an account?{' '}
                    <Link href="/login">
                        <Button variant="link" className="px-0">
                            Login
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SignUp;
