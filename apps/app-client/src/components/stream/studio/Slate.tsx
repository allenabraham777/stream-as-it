import { drawUserVideo } from '@/helpers/slate';
import useAppSelector from '@/hooks/useAppSelector';
import React, { useRef } from 'react';

type Props = {};

const Slate = (props: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolution, streamStudioStatus } = useAppSelector((state) => state.stream);
    const { video, screen } = useAppSelector((state) => state.slate.loadStatus);
    const computeFrame = () => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d')!;
        if (!context) return;
        const canvasHeight = resolution.height;
        const canvasWidth = resolution.width;
        canvasRef.current.setAttribute('height', canvasHeight.toString());
        canvasRef.current.setAttribute('width', canvasWidth.toString());
        context.fillStyle = 'red';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        drawUserVideo(
            context,
            video,
            streamStudioStatus.video,
            screen,
            streamStudioStatus.screen,
            canvasHeight,
            canvasWidth,
            { background: 'blue' }
        );
        requestAnimationFrame(computeFrame);
    };
    requestAnimationFrame(computeFrame);
    return (
        <div className="bg-black h-full max-w-6xl aspect-video flex justify-center items-center">
            <canvas ref={canvasRef} id="slate-canvas" className="max-h-full max-w-full"></canvas>
        </div>
    );
};

export default Slate;
