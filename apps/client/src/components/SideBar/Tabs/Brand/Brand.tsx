import React from 'react';
import Background from 'components/SideBar/Tabs/Brand/Background';
import Color from 'components/SideBar/Tabs/Brand/Color';
import Shape from 'components/SideBar/Tabs/Brand/Shape';

type Props = {};

const Brand = (props: Props) => {
    return (
        <div className="px-8">
            <div className="py-4">
                <Color />
            </div>
            <div className="pb-4">
                <Shape />
            </div>
            <div className="pb-4">
                <Background />
            </div>
        </div>
    );
};

export default Brand;
