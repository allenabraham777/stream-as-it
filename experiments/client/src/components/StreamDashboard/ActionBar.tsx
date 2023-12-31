import React, { useEffect } from 'react';
import { BsMic, BsCameraVideo, BsCameraVideoOff, BsMicMute } from 'react-icons/bs';
import { LuScreenShare, LuScreenShareOff } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import useCamera from 'hooks/useCamera';
import useScreen from 'hooks/useScreen';
import videoState from 'store/videoState';
import streamState from 'store/streamState';

type Props = {};

const ActionBar = (props: Props) => {
    const [videoSettings, setVideoSettings] = useRecoilState(videoState);
    const [canvasStream, setCanvasStream] = useRecoilState(streamState);
    const { startCamera, stopCamera } = useCamera();
    const { startScreenShare, stopScreenShare } = useScreen();

    useEffect(() => {
        const handleMedia = async () => {
            setVideoSettings({
                video: false,
                audio: false,
                screen: false,
                stream: null,
                screenStream: null
            });
            stopCamera();
            const resolution: IStartCamera = { width: 3840, height: 2160 };
            const stream = await startCamera(resolution);

            setVideoSettings({ ...videoSettings, stream });
        };

        handleMedia();
    }, [setVideoSettings, startCamera, stopCamera, videoSettings]);

    const setAudio = () => {
        setVideoSettings({ ...videoSettings, audio: !videoSettings.audio });
    };

    const setVideo = () => {
        setVideoSettings({ ...videoSettings, video: !videoSettings.video });
    };

    const handleShareScreen = async () => {
        let screen, screenStream;
        if (videoSettings.screen) {
            screen = false;
            screenStream = null;
            stopScreenShare();
        } else {
            screenStream = await startScreenShare();
            screenStream.getVideoTracks()[0].addEventListener('ended', () => {
                setVideoSettings({
                    ...videoSettings,
                    screen: false,
                    screenStream: null
                });
                setCanvasStream({
                    ...canvasStream,
                    screen: false
                });
            });
            screen = true;
        }
        setVideoSettings({ ...videoSettings, screen, screenStream });
    };

    return (
        <div className="h-[100%] w-[100%] flex justify-center items-center">
            <div className="flex text-3xl gap-10 text-gray-500 shadow-lg px-10 py-5 rounded-lg border border-opacity-5 border-gray-500">
                <button className="cursor-pointer" onClick={setAudio}>
                    {videoSettings.audio ? <BsMic /> : <BsMicMute />}
                </button>
                <button className="cursor-pointer" onClick={setVideo}>
                    {videoSettings.video ? <BsCameraVideo /> : <BsCameraVideoOff />}
                </button>
                <button className="cursor-pointer" onClick={handleShareScreen}>
                    {videoSettings.screen ? <LuScreenShare /> : <LuScreenShareOff />}
                </button>
            </div>
        </div>
    );
};

export default ActionBar;
