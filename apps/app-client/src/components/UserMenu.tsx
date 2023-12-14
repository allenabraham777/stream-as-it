"use client";
import { useLogout } from "@/hooks/auth/useLogout";
import { clearUserDetails } from "@/store/slices/authSlice";
import { Dispatch, StoreState } from "@/store/store";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@stream-as-it/ui";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const UserMenu = (props: Props) => {
  const user = useSelector((state: StoreState) => state.auth.user);
  const dispatch = useDispatch<Dispatch>();
  const { logout } = useLogout();
  const router = useRouter();

  const signout = useCallback(() => {
    logout();
    dispatch(clearUserDetails());
    router.push("/login");
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
        <DropdownMenuLabel className="text-xl text-primary">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signout}>
            <LogOut className="mr-4 h-6 w-6" />
            <span className="text-base">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
