'use client';
import React from 'react';

import { shapesList, brand as constants } from '@/constants/brand';
import { getFgColor } from '@/helpers/colors';
import { setBrandShape } from '@/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

type Props = {};

const classNames = {
    [constants.shapes.RECTANGLE]: 'p-2',
    [constants.shapes.BUBBLE]: 'p-2 rounded-full'
};

const Shape = (props: Props) => {
    const dispatch = useAppDispatch();
    const brand = useAppSelector((state) => state.brand);
    const fgColor = getFgColor(brand.color);
    const setShape = (shape: string) => {
        dispatch(setBrandShape(shape));
    };
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-medium text-left">Shape Layout</h1>
            <div className="flex gap-4 overflow-y-scroll">
                {shapesList.map((shape) => (
                    <div
                        key={shape}
                        onClick={setShape.bind(null, shape)}
                        className={`border ${
                            shape === brand.shape ? 'border-blue-700 border-2' : ''
                        } aspect-square w-24 rounded-lg flex items-center text-xs cursor-pointer`}
                    >
                        <span
                            style={{ background: brand.color, color: fgColor }}
                            className={`w-full text-center ${classNames[shape]}`}
                        >
                            {shape}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shape;
