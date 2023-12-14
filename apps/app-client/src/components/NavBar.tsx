"use client";
import React from "react";
import { useTheme } from "next-themes";

import { Button, cn, ThemeToggle } from "@stream-as-it/ui";
import Link from "next/link";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import UserMenu from "./UserMenu";

type Props = {
  hideButtons?: boolean;
  fixed?: boolean;
};

const NavBar = (props: Props) => {
  const { setTheme } = useTheme();
  const { user, loading } = useSelector((state: StoreState) => state.auth);
  return (
    <nav
      className={cn("flex w-full p-3 gap-4", { "fixed top-0": props.fixed })}
    >
      <div className="flex-1"></div>
      <ThemeToggle setTheme={setTheme} />
      {!props.hideButtons && (
        <>
          {!loading && !user ? (
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
