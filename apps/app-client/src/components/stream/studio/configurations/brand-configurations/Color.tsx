'use client';
import React, { useEffect, useState } from 'react';

import { ColorPicker, Input, Typography } from '@stream-as-it/ui';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { setBrandColor } from '@/store';

const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;

type Props = {};

const Color = (props: Props) => {
    const dispatch = useAppDispatch();
    const brand = useAppSelector((state) => state.brand);
    const [selectColor, setSelectColor] = useState(false);
    const [colorText, setColorText] = useState(brand.color);

    const setColor = (color: string) => {
        dispatch(setBrandColor(color));
        setSelectColor(false);
    };

    useEffect(() => {
        setColorText(brand.color);
    }, [brand]);

    const changeColorText = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setColorText(value);
        if (HEX_COLOR_REGEX.test(value)) {
            setColor(value);
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <Typography>Brand Color</Typography>
            <div className="flex gap-4 relative">
                <div
                    style={{ backgroundColor: brand.color }}
                    className={`w-10 h-10 aspect-square rounded-full cursor-pointer`}
                    onClick={() => setSelectColor(!selectColor)}
                ></div>
                <div className="absolute z-20">
                    <ColorPicker show={selectColor} color={brand.color} onChange={setColor} />
                </div>
                <Input value={colorText} onChange={changeColorText} />
            </div>
        </div>
    );
};

export default Color;
