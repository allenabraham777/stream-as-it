let canvasStream: MediaStream | null;

export const startStream = (
    stream: MediaStream | null,
    screenStream: MediaStream | null,
    isScreenInCanvas: boolean,
    cameraAudio: boolean
) => {
    const slate = document.getElementById('slate') as HTMLCanvasElement;
    canvasStream = slate.captureStream(30);
    if (!canvasStream) {
        canvasStream = new MediaStream();
    }

    const audioContext = new AudioContext();
    const audios = [];

    const destination = audioContext.createMediaStreamDestination();

    if (cameraAudio) {
        const audioTracks = stream?.getAudioTracks();
        if (audioTracks && audioTracks.length > 0) {
            audios.push(audioContext.createMediaStreamSource(stream!));
        }
    }

    if (isScreenInCanvas) {
        const screenAudioTracks = screenStream?.getAudioTracks();
        if (screenAudioTracks && screenAudioTracks.length > 0) {
            audios.push(audioContext.createMediaStreamSource(screenStream!));
        }
    }

    audios.forEach((audio) => {
        audio.connect(destination);
    });

    if (audios.length) {
        canvasStream.addTrack(destination.stream.getAudioTracks()[0]);
    }

    const output = document.getElementById('output-video') as HTMLVideoElement;
    output.srcObject = canvasStream;
};

export const stopStream = () => {
    if (canvasStream) {
        canvasStream.getTracks().forEach((track) => {
            if (track.kind === 'video') track.stop();
        });
        canvasStream = null;
    }

    const output = document.getElementById('output-video') as HTMLVideoElement;
    output.srcObject = canvasStream;
};
