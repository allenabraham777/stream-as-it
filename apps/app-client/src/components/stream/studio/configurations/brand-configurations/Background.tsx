'use client';
import React from 'react';

import { backgroundList } from '@/constants/brand';
import { setBrandBackground } from '@/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

type Props = {};

const Background = (props: Props) => {
    const dispatch = useAppDispatch();
    const brand = useAppSelector((state) => state.brand);
    const setBackground = (background: string) => {
        dispatch(setBrandBackground(background));
    };

    return (
        <div className="flex flex-col gap-4 max-w-[100%]">
            <h1 className="text-lg font-medium text-left">Background</h1>
            <div className="flex gap-4 relative overflow-y-scroll max-w-[100%]">
                {backgroundList.map((background) => (
                    <div
                        key={background.key}
                        onClick={setBackground.bind(null, background.color)}
                        style={{ background: background.color }}
                        className={`h-20 aspect-square rounded-md cursor-pointer ${
                            brand.background === background.color ? 'border-2 border-blue-700' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Background;
