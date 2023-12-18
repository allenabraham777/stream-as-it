'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button, cn, ThemeToggle } from '@stream-as-it/ui';
import UserMenu from './UserMenu';

type Props = {
    hideButtons?: boolean;
    fixed?: boolean;
};

const NavBar = (props: Props) => {
    const { setTheme } = useTheme();
    const { data: session, status } = useSession();
    return (
        <nav
            className={cn(
                'flex w-full p-3 gap-4 border-b border-secondary shadow-sm drop-shadow-sm',
                {
                    'fixed top-0': props.fixed
                }
            )}
        >
            <div className="flex-1"></div>
            <ThemeToggle setTheme={setTheme} />
            {!props.hideButtons && status !== 'loading' && (
                <>
                    {!session?.user ? (
                        <>
                            <Link href="/login">
                                <Button size="lg">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="secondary" size="lg">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <UserMenu />
                    )}
                </>
            )}
        </nav>
    );
};

export default NavBar;
