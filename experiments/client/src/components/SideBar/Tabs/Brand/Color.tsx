import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import brandState from 'store/brandState';
import ColorPicker from 'components/common/ColorPicker';

const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;

type Props = {};

const Color = (props: Props) => {
    const [brand, setBrand] = useRecoilState(brandState);
    const [selectColor, setSelectColor] = useState(false);
    const [colorText, setColorText] = useState(brand.color);
    const setColor = (color: string) => {
        setBrand({
            ...brand,
            color
        });
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
            <h1 className="text-lg font-medium text-left">Brand Color</h1>
            <div className="flex gap-4 relative">
                <div
                    style={{ backgroundColor: brand.color }}
                    className={`w-10 aspect-square rounded-full cursor-pointer`}
                    onClick={() => setSelectColor(!selectColor)}
                ></div>
                <div className="absolute z-20">
                    <ColorPicker show={selectColor} color={brand.color} onChange={setColor} />
                </div>
                <input
                    className="h-10 px-2 rounded-lg outline-none border border-gray-500 border-opacity-30"
                    value={colorText}
                    onChange={changeColorText}
                />
            </div>
        </div>
    );
};

export default Color;
