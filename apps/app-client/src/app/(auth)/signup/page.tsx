"use client";
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
import Link from "next/link";
import React from "react";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-primary">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="account_name">Account User Name</Label>
          <Input id="account_name" type="text" placeholder="organization" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Jack Daniel" />
        </div>
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
        <Button className="w-full">Create account</Button>
        <div className="w-full">
          Already have an account?{" "}
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
