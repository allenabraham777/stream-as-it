'use client';
import { useLogout } from '@/hooks/auth/useLogout';
import { clearUserDetails } from '@/store/slices/authSlice';
import { Dispatch, StoreState } from '@/store/store';
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
import { LayoutDashboard, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const UserMenu = (props: Props) => {
    const user = useSelector((state: StoreState) => state.auth.user);
    const dispatch = useDispatch<Dispatch>();
    const { logout } = useLogout();
    const router = useRouter();

    const signout = useCallback(() => {
        logout();
        dispatch(clearUserDetails());
        router.push('/login');
    }, [logout, router, dispatch]);

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-3">
                <DropdownMenuLabel className="text-xl text-primary">{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="py-2">
                    <Link href="/stream/dashboard">
                        <DropdownMenuItem className="py-2 cursor-pointer">
                            <LayoutDashboard className="mr-4 h-6 w-6" />
                            <span className="text-base">Dashboard</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={signout}>
                        <LogOut className="mr-4 h-6 w-6" />
                        <span className="text-base">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
