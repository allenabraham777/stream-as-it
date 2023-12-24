import React from 'react';

import { Typography } from '@stream-as-it/ui';

type Props = {
    title: string;
};

const NotImplemented = (props: Props) => {
    return (
        <div className="p-8">
            <Typography variant="h3">{props.title}</Typography>
            <Typography variant="p">Will be implemented soon</Typography>
        </div>
    );
};

export default NotImplemented;
