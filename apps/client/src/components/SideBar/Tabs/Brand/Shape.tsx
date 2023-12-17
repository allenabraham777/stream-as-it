import React from 'react';
import { useRecoilState } from 'recoil';
import constants, { shapesList } from 'constants/brand';
import { getFgColor } from 'helpers/colors';
import brandState from 'store/brandState';

type Props = {};

const classNames = {
    [constants.shapes.RECTANGLE]: 'p-2',
    [constants.shapes.BUBBLE]: 'p-2 rounded-full'
};

const Shape = (props: Props) => {
    const [brand, setBrand] = useRecoilState(brandState);
    const fgColor = getFgColor(brand.color);
    const setShape = (shape: string) => {
        setBrand({
            ...brand,
            shape
        });
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
                            className={`w-full ${classNames[shape]}`}
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
