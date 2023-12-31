import { useState } from 'react';

const useCamera = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const startCamera = async (video: IStartCamera) => {
        const localStreamConstraints = {
            audio: true,
            video
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
        startCamera,
        stopCamera
    };
};

export default useCamera;
