"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Input,
  CardFooter,
  Button,
  CardContent,
} from "@stream-as-it/ui";

const REGEX = /^[a-z0-9]*$/g;

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-primary">
          Login to your account
        </CardTitle>
        <CardDescription>
          Enter your details below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="p@ssw0rd" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">Login</Button>
        <div className="w-full">
          Do not have an account?{" "}
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
