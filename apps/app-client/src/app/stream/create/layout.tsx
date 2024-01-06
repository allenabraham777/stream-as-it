import React from 'react';

type Props = {
    children: React.ReactNode;
};

const CreateStreamLayout = ({ children }: Props) => {
    return <div className="h-full w-full flex items-center justify-center">{children}</div>;
};

export default CreateStreamLayout;
