'use client';
import React from 'react';
import { LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@stream-as-it/ui';

interface Props {}

const UserMenu = (props: Props) => {
    const { data } = useSession();
    const user = data?.user;

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 mr-3">
                <DropdownMenuLabel className="text-xl text-primary">{user.name}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-base">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="py-2">
                    <Link href="/stream/dashboard">
                        <DropdownMenuItem className="py-2 cursor-pointer">
                            <LayoutDashboard className="mr-4 h-6 w-6" />
                            <span className="text-base">Dashboard</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => signOut()}>
                        <LogOut className="mr-4 h-6 w-6" />
                        <span className="text-base">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
