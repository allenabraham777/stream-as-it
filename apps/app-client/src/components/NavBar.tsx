"use client";
import React from "react";
import { useTheme } from "next-themes";

import { Button, cn, ThemeToggle } from "@stream-as-it/ui";
import Link from "next/link";

type Props = {
  hideButtons?: boolean;
  fixed?: boolean;
};

const NavBar = (props: Props) => {
  const { setTheme } = useTheme();
  return (
    <nav
      className={cn("flex w-full p-3 gap-4", { "fixed top-0": props.fixed })}
    >
      <div className="flex-1"></div>
      {!props.hideButtons && (
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
      )}
      <ThemeToggle setTheme={setTheme} />
    </nav>
  );
};

export default NavBar;
