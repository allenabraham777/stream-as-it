import { useEffect, useRef } from "react";
import io from "socket.io-client";

const App = () => {
  const socket = useRef(null);
  const streamKey = "stream-key";

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      console.log("Socket.IO Client Connected");
      socket.current.emit("streamKey", { streamKey });
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const captureAndSendStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp8",
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && socket.current.connected) {
            socket.current.emit("streamData", event.data);
          }
        };

        mediaRecorder.start(100);
      })
      .catch((err) => console.error("Error: " + err));
  };

  return (
    <div>
      <h1>Live Stream</h1>
      <button onClick={captureAndSendStream}>Stream</button>
    </div>
  );
};

export default App;
