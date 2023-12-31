import React, { RefObject, useEffect, useRef } from 'react';
import { AiOutlineUser, AiOutlineMinus } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { BsMic, BsCameraVideo, BsCameraVideoOff, BsMicMute } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import streamState from 'store/streamState';
import videoState from 'store/videoState';
import UserImage from 'assets/user.png';

type Props = {};

type thumbProps = {
    videoRef: RefObject<HTMLVideoElement>;
    bridgeSetter: (videoRef: RefObject<HTMLVideoElement>, keyName: string) => void;
    keyName: string;
    id: string;
    status: boolean;
    label: string;
    disableController?: boolean;
    controllerOptions?: {
        audio: boolean;
        video: boolean;
        audioControl: () => void;
        videoControl: () => void;
    };
};

const VideoThumb = ({
    id,
    videoRef,
    bridgeSetter,
    keyName,
    status,
    label,
    disableController = false,
    controllerOptions = {
        audio: false,
        video: false,
        audioControl: () => {},
        videoControl: () => {}
    }
}: thumbProps) => {
    return (
        <div className="h-[100%] border border-gray-500 rounded-md overflow-hidden relative group">
            <video
                ref={videoRef}
                id={id}
                autoPlay={true}
                playsInline
                muted
                className="h-[100%] aspect-video"
            />
            <div
                onClick={bridgeSetter.bind(null, videoRef, keyName)}
                className="absolute z-20 opacity-0 group-hover:opacity-100 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] cursor-pointer"
            >
                <button className="w-[100%] bg-gray-100 p-2 flex items-center justify-center gap-2 rounded-md">
                    {status ? (
                        <>
                            <AiOutlineMinus />
                            Remove From Stream
                        </>
                    ) : (
                        <>
                            <GrAdd />
                            Add To Stream
                        </>
                    )}
                </button>
            </div>
            <div className="absolute px-2 py-1 bg-blue-700 text-white text-sm bottom-0 left-0 right-0 w-full z-20 flex items-center gap-2">
                <AiOutlineUser className="text-xl" />
                <span>{label}</span>
            </div>
            {!disableController && (
                <div className="absolute z-20 right-2 top-2 bg-gray-50 border text-gray-900 flex rounded-sm font-semibold">
                    <button
                        className={`p-1 border-r ${
                            controllerOptions.audio && 'bg-blue-700 text-white'
                        }`}
                        onClick={controllerOptions.audioControl}
                    >
                        {controllerOptions.audio ? <BsMic /> : <BsMicMute />}
                    </button>
                    <button
                        className={`p-1 ${controllerOptions.video && 'bg-blue-700 text-white'}`}
                        onClick={controllerOptions.videoControl}
                    >
                        {controllerOptions.video ? <BsCameraVideo /> : <BsCameraVideoOff />}
                    </button>
                </div>
            )}
        </div>
    );
};

const VideoList = (props: Props) => {
    const [videoSettings, setVideoSettings] = useRecoilState(videoState);
    const [canvasStream, setCanvasStream] = useRecoilState(streamState);
    const videoRef = useRef<HTMLVideoElement>(null);
    const screenRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = videoSettings.video ? videoSettings.stream : null;
            if (!videoSettings.video) {
                videoRef.current.poster = UserImage;
            }
        }
    }, [videoRef, videoSettings]);
    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.srcObject = videoSettings.screen ? videoSettings.screenStream : null;
        }
    }, [screenRef, videoSettings]);

    const streamControl = (videoRef: RefObject<HTMLVideoElement>, keyName: string) => {
        if (canvasStream[keyName as keyof typeof canvasStream]) {
            setCanvasStream({ ...canvasStream, [keyName]: false });
            return;
        }

        if (!videoRef?.current) return;

        setCanvasStream({ ...canvasStream, [keyName]: true });
    };

    const micControl = () => {
        setVideoSettings({
            ...videoSettings,
            audio: !videoSettings.audio
        });
    };

    const videoControl = () => {
        setVideoSettings({
            ...videoSettings,
            video: !videoSettings.video
        });
    };

    return (
        <div className="w-[100%] h-[100%] flex items-center gap-4">
            <VideoThumb
                id="user-video"
                videoRef={videoRef}
                bridgeSetter={streamControl}
                keyName="video"
                status={canvasStream.video}
                label="Host User Name"
                controllerOptions={{
                    video: videoSettings.video,
                    audio: videoSettings.audio,
                    audioControl: micControl,
                    videoControl
                }}
            />
            {videoSettings.screen && (
                <VideoThumb
                    id="screen-video"
                    videoRef={screenRef}
                    bridgeSetter={streamControl}
                    keyName="screen"
                    status={canvasStream.screen}
                    label="Screen"
                    disableController
                />
            )}
            <video
                id="output-video"
                autoPlay={true}
                playsInline
                className="h-[100%] aspect-video"
            ></video>
        </div>
    );
};

export default VideoList;
