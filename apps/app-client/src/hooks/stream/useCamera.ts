'use client';
import { useState } from 'react';

const useCamera = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const startCamera = async () => {
        const localStreamConstraints = {
            audio: true,
            video: true
        };
        try {
            const newStream = await navigator.mediaDevices.getUserMedia(localStreamConstraints);

            setStream(newStream);
            return newStream;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const stopCamera = () => {
        if (!stream) return;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            console.info('Stopping Track: ' + track.kind);
            track.stop();
        });
        setStream(null);
    };

    return {
        stream,
        startCamera,
        stopCamera
    };
};

export default useCamera;
