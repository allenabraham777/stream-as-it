'use client';

import React from 'react';
import Image from 'next/image';

import { Button, Typography } from '@stream-as-it/ui';
import Link from 'next/link';

interface Props {}

const Home = (props: Props) => {
    return (
        <section className="h-full flex max-sm:flex-col sm:flex-row">
            <div className="flex-1 flex flex-col items-center p-4 sm:p-0 sm:justify-center gap-8 order-2 sm:order-1 max-w-[vw]">
                <Typography
                    variant="h1"
                    className="text-10xl scale-[3] sm:scale-150 bg-gradient-to-r from-[#e23369] via-[#590958] to-[#270742] dark:from-[#7cfeff] dark:via-[#febe8e] dark:to-[#39cbf7] text-transparent dark:text-transparent bg-clip-text"
                >
                    Stream As It
                </Typography>
                <Typography variant="h3" className="text-[#390849] dark:text-[#a665fe] text-center">
                    Stream from your browser to web...
                </Typography>
                <Link href="/signup">
                    <Button className="px-20 py-6 rounded-full text-lg">Get Started</Button>
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center order-1 sm:order-2 overflow-hidden pt-12 sm:pt-0">
                <div className="w-[540px] overflow-hidden dark:block hidden">
                    <Image src="/dark.png" width="540" height="540" alt="hero" />
                </div>
                <div className="w-[540px] overflow-hidden block dark:hidden">
                    <Image src="/light.png" width="540" height="540" alt="hero" />
                </div>
            </div>
        </section>
    );
};

export default Home;
