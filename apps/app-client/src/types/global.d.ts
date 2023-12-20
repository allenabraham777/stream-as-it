declare global {
    export namespace Stream {
        interface IResolution {
            width: number;
            height: number;
        }

        interface IStreamStudioStatus {
            video: boolean;
            audio: boolean;
            screen: boolean;
        }

        interface IStreamStatus {
            isLive: boolean;
        }

        interface IStreamData {
            videoStream: MediaStream | null;
            screenShareStream: MediaStream | null;
            canvasStream: MediaStream | null;
        }

        interface IStreamSlice {
            resolution: Stream.IResolution;
            streamStudioStatus: Stream.IStreamStudioStatus;
            streamStatus: Stream.IStreamStatus;
            streamData: Stream.IStreamData;
        }
    }

    export namespace Slate {
        interface ILoadStatus {
            video: boolean;
            audio: boolean;
            screen: boolean;
        }

        interface ISlateSlice {
            loadStatus: ILoadStatus;
        }
    }

    export namespace Brand {
        interface IBrand {
            color: string;
            shape: string;
            background: string;
        }
    }
}

export {};
