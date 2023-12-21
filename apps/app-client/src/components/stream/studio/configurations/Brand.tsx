import React from 'react';

import Color from './brand-configurations/Color';
import Shape from './brand-configurations/Shape';
import Background from './brand-configurations/Background';

type Props = {};

const Brand = (props: Props) => {
    return (
        <div className="p-8 flex flex-col gap-4">
            <Color />
            <Shape />
            <Background />
        </div>
    );
};

export default Brand;
