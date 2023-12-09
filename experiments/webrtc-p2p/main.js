const bootstrap = () => {
  const socket = io("http://localhost:3002");

  const peerService = new PeerService();

  let user;
  let remote;

  let myStream;
  let remoteStream;

  const onTrack = (e) => {
    const video = document.getElementById("user-2");
    const remoteStream = e.streams[0];
    console.log(remoteStream);
    video.srcObject = remoteStream;
    video.play();
  };

  const onNegotiation = (e) => {
    console.log("NEGOTIATE");
  };

  const serverActions = () => {
    socket.on("user:joined", (data) => {
      console.log("SERVER - user:joined: ", data);
      remote = data.id;
      socket.emit("server:details", { to: remote, id: user });
    });
    socket.on("user:details", (data) => {
      console.log("SERVER - user:details: ", data);
      user = data;
    });
    socket.on("get:answer", async (offer) => {
      console.log("SERVER - get:answer: ", offer);
      const _offer = await JSON.parse(offer);
      peerService.attachOnTrack(onTrack);
      const answer = await peerService.getAnswer(_offer);
      socket.emit("send:answer", {
        to: remote,
        answer: JSON.stringify(answer),
      });
    });
  };

  const clientActions = () => {
    socket.on("user:joined", (data) => {
      console.log("CLIENT - user:joined: ", data);
      remote = data.id;
    });
    socket.on("user:details", (data) => {
      console.log("CLIENT: - user:details: ", data);
      user = data;
    });
    socket.on("answer:joined", (data) => {
      console.log("CLIENT: JOINED: ", data);
    });
    socket.on("server:details", (data) => {
      console.log("CLIENT - server:details: ", data);
      remote = data;
    });
    socket.on("send:answer", async (answer) => {
      console.log("CLIENT - send:answer: ", answer);
      const _answer = await JSON.parse(answer);
      await peerService.setRemoteDescription(_answer);
    });
  };

  const clientUIEvents = () => {
    const button = document.getElementById("call");
    button.addEventListener("click", async () => {
      const offer = await peerService.getOffer();
      socket.emit("get:answer", { to: remote, offer: JSON.stringify(offer) });
      // let i = 1;
      // const interval = setInterval(async () => {
      //   if (i === 3) {
      //     clearInterval(interval);
      //   }
      //   i++;
      // }, 2000);
    });
  };

  const init = (type) => {
    if (type === "server") {
      serverActions();
      document.title = "SERVER";
      peerService.attachNegotiationHandler(onNegotiation);
    } else {
      document.title = "CLIENT";
      clientActions();
      clientUIEvents();
    }
    socket.emit("room:join", { roomId: "abc", type });
  };

  document.getElementById("start").addEventListener("click", () => {
    const type = document.getElementById("type").value;
    if (!type) return;
    if (type !== "server") {
      document.getElementById("call").style.display = "block";
    }
    init(type);
  });

  document.getElementById("stream").addEventListener("click", async () => {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    const video = document.getElementById("user-1");
    console.log({ myStream });
    video.srcObject = myStream;
    myStream.getTracks().forEach((track) => {
      console.log("TRACK:", track);
      peerService.addTrack(track, myStream);
    });
  });
};

bootstrap();
