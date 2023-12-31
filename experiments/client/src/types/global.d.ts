export {};

declare global {
    interface IStartCamera {
        width: number;
        height: number;
    }

    interface IBrand {
        color: string;
        shape: string;
        background: string;
    }

    interface ISettings {
        resolution: {
            id: string;
            width: number;
            height: number;
        };
    }
}
