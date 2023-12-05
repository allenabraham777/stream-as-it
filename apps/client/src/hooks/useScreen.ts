import { useState } from "react";

const useScreen = () => {
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null);
  const startScreenShare = async () => {
    const options = {
      video: {
        displaySurface: "window",
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
        suppressLocalAudioPlayback: true,
      },
      surfaceSwitching: "include",
      selfBrowserSurface: "exclude",
      systemAudio: "exclude",
    };
    const captureStream = await navigator.mediaDevices.getDisplayMedia(options);
    setScreenShareStream(captureStream);
    return captureStream;
  };
  const stopScreenShare = () => {
    if (!screenShareStream) return;
    const tracks = screenShareStream.getTracks();

    tracks.forEach((track) => {
      console.info("Stopping Track: " + track.kind);
      track.stop();
    });
    setScreenShareStream(null);
  };

  return { screenShareStream, startScreenShare, stopScreenShare };
};

export default useScreen;