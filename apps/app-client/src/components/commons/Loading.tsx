import { Loader2 } from 'lucide-react';
import React from 'react';

type Props = {};

const Loading = (props: Props) => {
    return (
        <div className="h-full flex justify-center items-center">
            <Loader2 className="w-24 h-24 animate-spin text-primary" />
        </div>
    );
};

export default Loading;
