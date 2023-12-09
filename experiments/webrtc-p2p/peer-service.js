const SERVERS = Object.freeze({
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
});

class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection(SERVERS);
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    }
  }

  async setRemoteDescription(answer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  addTrack(track, stream) {
    this.peer.addTrack(track, stream);
  }

  attachOnTrack(handler) {
    this.peer.addEventListener("track", handler);
  }

  attachNegotiationHandler(handler) {
    this.peer.addEventListener("negotiationneeded", handler);
  }
}
