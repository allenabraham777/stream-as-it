import { Injectable } from '@nestjs/common';
import * as wrtc from 'werift';

const SERVERS = {
  iceServers: [
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
    {
      urls: 'stun:stun2.l.google.com:19302',
    },
  ],
};

@Injectable()
export class PeerService {
  private peer;

  constructor() {
    this.peer = new wrtc.RTCPeerConnection(SERVERS);
  }

  async getOffer() {
    if (this.peer) {
      const offer =
        (await this.peer.createOffer()) as wrtc.RTCSessionDescription;
      await this.peer.setLocalDescription(offer);
      return offer;
    }
  }

  async getAnswer(offer: wrtc.RTCSessionDescriptionInit) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    }
  }

  async setRemoteDescription(answer: wrtc.RTCSessionDescriptionInit) {
    if (this.peer) {
      await this.peer.setRemoteDescription(answer);
    }
  }

  addTrack(track: any, stream: any) {
    this.peer.addTrack(track, stream);
  }

  attachOnTrack(handler: any) {
    this.peer.ontrack = handler;
  }
}
