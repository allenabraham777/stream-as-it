import React from 'react';
import Header from 'components/common/Header';

type Props = {
    children: JSX.Element;
};

const DefaultLayout = ({ children }: Props) => {
    return (
        <div className="h-[100vh]">
            <Header />
            <div className="h-[100%] pt-[5vh]">{children}</div>
        </div>
    );
};

export default DefaultLayout;
