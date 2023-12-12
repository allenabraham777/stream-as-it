"use client";

import React from "react";
import Image from "next/image";

import { Button, Typography, ThemeToggle } from "@stream-as-it/ui";
import { useTheme } from "next-themes";

type Props = {};

const Home = (props: Props) => {
  const { setTheme } = useTheme();
  return (
    <section className="h-full flex">
      <div className="absolute">
        <ThemeToggle setTheme={setTheme} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <Typography variant="h1" className="text-9xl scale-150">
          Stream As It
        </Typography>
        <Typography variant="h3">Stream from your browser to web...</Typography>
        <Button>Get Started</Button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="rounded-[15%] w-[400px] h-[400px] overflow-hidden hidden dark:block">
          <Image
            src="/dark.png"
            width="400"
            height="400"
            alt="hero"
            className="scale-[161%] -translate-y-[5.25%]"
          />
        </div>
        <div className="w-[540px] h-[540px] overflow-hidden block dark:hidden">
          <Image src="/light.png" width="540" height="540" alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Home;
