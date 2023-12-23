import { Socket } from 'socket.io-client';

import { StreamKey } from '@stream-as-it/types';

let canvasStream: MediaStream | null;
let mediaRecorder: MediaRecorder | null;
let gainNode: GainNode;

export const startStream = (
    stream: MediaStream | null,
    screenStream: MediaStream | null,
    isScreenInCanvas: boolean,
    cameraAudio: boolean,
    socket: Socket,
    streamKeys: StreamKey[]
) => {
    const slate = document.getElementById('slate-canvas') as HTMLCanvasElement;
    canvasStream = slate.captureStream(30);
    if (!canvasStream) {
        canvasStream = new MediaStream();
    }

    const audioContext = new AudioContext();
    const audios = [];

    const source = audioContext.createMediaStreamSource(stream as MediaStream);
    const destination = audioContext.createMediaStreamDestination();
    gainNode = audioContext.createGain();
    if (cameraAudio) {
        gainNode.gain.value = 1;
    } else {
        gainNode.gain.value = 0;
    }
    source.connect(gainNode);
    gainNode.connect(destination);

    if (isScreenInCanvas) {
        const screenAudioTracks = screenStream?.getAudioTracks();
        if (screenAudioTracks && screenAudioTracks.length > 0) {
            audios.push(audioContext.createMediaStreamSource(screenStream!));
        }
    }

    audios.forEach((audio) => {
        audio.connect(destination);
    });

    const tracks = destination.stream.getAudioTracks();

    if (tracks.length) canvasStream.addTrack(tracks[0]);

    broadcast(socket, canvasStream as MediaStream, streamKeys);
};

export const toggleMute = (cameraAudio: boolean) => {
    if (gainNode && gainNode?.gain) {
        gainNode.gain.value = cameraAudio ? 1 : 0;
    }
};

const broadcast = (socket: Socket, stream: MediaStream, streamKeys: StreamKey[]) => {
    if (canvasStream) {
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp8,opus'
        });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                streamKeys.forEach((streamKey) => {
                    socket.emit(`stream:${streamKey.platform.toLowerCase()}`, event.data);
                });
            }
        };

        mediaRecorder.start(100);
    }
};

export const stopStream = (socket: Socket) => {
    if (canvasStream) {
        socket.emit('end:all');
        canvasStream.getTracks().forEach((track) => {
            if (track.kind === 'video') track.stop();
        });
        canvasStream = null;
    }
    if (mediaRecorder) {
        mediaRecorder.stop();
    }
};
