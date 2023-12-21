import React, { useRef } from 'react';

import { drawScreenShareVideo, drawUserVideo } from '@/helpers/slate';
import useAnimationFrame from '@/hooks/stream/useAnimationFrame';
import useAppSelector from '@/hooks/useAppSelector';

type Props = {};

const Slate = (props: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolution, streamStudioStatus } = useAppSelector((state) => state.stream);
    const { video, screen } = useAppSelector((state) => state.slate.loadStatus);
    const brand = useAppSelector((state) => state.brand);

    useAnimationFrame(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d')!;
        if (!context) return;
        const canvasHeight = resolution.height;
        const canvasWidth = resolution.width;
        canvasRef.current.setAttribute('height', canvasHeight.toString());
        canvasRef.current.setAttribute('width', canvasWidth.toString());
        context.fillStyle = brand.background;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        drawUserVideo(
            context,
            video,
            streamStudioStatus.video,
            screen,
            streamStudioStatus.screen,
            canvasHeight,
            canvasWidth,
            brand
        );
        drawScreenShareVideo(
            context,
            video,
            screen,
            streamStudioStatus.screen,
            canvasHeight,
            canvasWidth
        );
    }, [resolution, canvasRef.current]);

    return (
        <div className="bg-transparent h-full max-w-6xl aspect-video flex justify-center items-center">
            <canvas
                ref={canvasRef}
                id="slate-canvas"
                className="max-h-full max-w-full border"
            ></canvas>
        </div>
    );
};

export default Slate;
