import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from 'selectors/userSelectors/userState';
import { CiStreamOn, CiStreamOff } from 'react-icons/ci';
import audioActiveState from 'selectors/videoSelectors/audioActiveState';
import videoStreamState from 'selectors/videoSelectors/videoStreamState';
import screenStreamState from 'selectors/videoSelectors/screenStreamState';
import { startStream, stopStream } from 'helpers/stream';
import canvasScreenStreamState from 'selectors/streamSelectors/canvasScreenStreamState';

type Props = {};

const BroadcastController = (props: Props) => {
    const params = useParams();
    const user = useRecoilValue(userState);
    const [isStreaming, setIsStreaming] = useState(false);
    const audio = useRecoilValue(audioActiveState);
    const stream = useRecoilValue(videoStreamState);
    const screenStream = useRecoilValue(screenStreamState);
    const screen = useRecoilValue(canvasScreenStreamState);

    useEffect(() => {
        if (isStreaming) {
            stopStream();
            startStream(stream, screenStream, screen, audio);
        } else if (!isStreaming) {
            stopStream();
        }
    }, [stream, screenStream, screen, audio, isStreaming]);

    if (!user || !params.streamId) return null;

    return (
        <div className="flex">
            <button
                onClick={setIsStreaming.bind(null, !isStreaming)}
                className={`text-white py-1 px-4 rounded-lg flex items-center gap-2 hover:bg-white ${
                    isStreaming
                        ? 'bg-red-600 border-2 border-red-600 hover:text-red-600'
                        : 'bg-blue-600 border-2 border-blue-600 hover:text-blue-600'
                }`}
            >
                {isStreaming ? (
                    <>
                        <CiStreamOff />
                        Stop Streaming
                    </>
                ) : (
                    <>
                        <CiStreamOn />
                        Start Streaming
                    </>
                )}
            </button>
        </div>
    );
};

export default BroadcastController;
