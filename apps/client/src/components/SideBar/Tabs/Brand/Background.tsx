import React from 'react';
import { useRecoilState } from 'recoil';
import { backgroundList } from 'constants/brand';
import brandState from 'store/brandState';

type Props = {};

const Background = (props: Props) => {
    const [brand, setBrand] = useRecoilState(brandState);
    const setBackground = (background: string) => {
        setBrand({
            ...brand,
            background
        });
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
