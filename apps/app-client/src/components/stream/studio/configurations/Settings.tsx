'use client';
import React from 'react';

import {
    Typography,
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent
} from '@stream-as-it/ui';
import { resolutionList, resolutions } from '@/constants/resolutions';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { setResolution } from '@/store';

type Props = {};

const Settings = (props: Props) => {
    const dispatch = useAppDispatch();
    const { width, height } = useAppSelector((state) => state.stream.resolution);
    const value = resolutionList.find(
        (resolution) => resolution.height === height && resolution.width === width
    );
    const updateResolution = (id: keyof typeof resolutions.resolutions) => {
        const { height, width } = resolutions.resolutions[id];
        dispatch(setResolution({ height, width }));
    };
    return (
        <div className="p-8 flex flex-col gap-4">
            <Typography>Video Resolution</Typography>
            <Select value={value?.id} onValueChange={updateResolution}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Resolution" />
                </SelectTrigger>
                <SelectContent>
                    {resolutionList.map((resolution) => (
                        <SelectItem value={resolution.id} key={resolution.id}>
                            {resolution.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Settings;
