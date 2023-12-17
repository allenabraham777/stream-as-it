'use client';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';

interface props extends React.HTMLAttributes<HTMLElement> {
    setTheme: (theme: string) => void;
}

function ThemeToggle({ setTheme }: props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-yellow-400 dark:bg-background  rounded-full"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ThemeToggle;
