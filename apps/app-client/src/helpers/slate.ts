import { brand as brandConstants } from '@/constants/brand';
import { fitImage } from './canvas';
import { getFgColor } from './colors';

export const computeFrame = (
    context: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number,
    streamStudioStatus: Stream.IStreamStudioStatus,
    video: boolean,
    screen: boolean,
    brand: Brand.IBrand
) => {
    drawUserVideo(
        context,
        video,
        streamStudioStatus.video!,
        screen,
        streamStudioStatus.screen!,
        canvasHeight,
        canvasWidth,
        brand
    );
    drawScreenShareVideo(
        context,
        video,
        screen,
        streamStudioStatus.screen!,
        canvasHeight,
        canvasWidth
    );
};

const drawUserLabel = (
    context: CanvasRenderingContext2D,
    text: string,
    brand: Brand.IBrand,
    x: number,
    y: number,
    height: number
) => {
    context.font = `${height * 0.6}px Arial`;
    const width = Math.max(
        context.measureText(text).width + 0.4 * height,
        context.measureText('________').width
    );
    context.save();
    context.fillStyle = brand.color;
    context.strokeStyle = brand.color;

    let textX, textY;

    switch (brand.shape) {
        case brandConstants.shapes.BUBBLE:
            context.roundRect(
                x + height / 2,
                y - height / 2,
                width + height / 2,
                height,
                height / 2
            );
            context.fill();
            textX = x + (width + height / 2) / 2 + height / 2;
            textY = y;
            break;
        case brandConstants.shapes.RECTANGLE:
        default:
            context.fillRect(x, y, width, height);
            textX = x + width / 2;
            textY = y + height / 2;
            break;
    }

    context.fillStyle = getFgColor(brand.color);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, textX, textY);
    context.restore();
};

const drawUserVideo = (
    context: CanvasRenderingContext2D,
    video: boolean,
    isVideoActive: boolean,
    screen: boolean,
    isScreenActive: boolean,
    canvasHeight: number,
    canvasWidth: number,
    brand: Brand.IBrand
) => {
    if (!screen && !video) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = brand.background;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        return;
    }
    let videoElement: HTMLVideoElement | HTMLImageElement = document.getElementById(
        'user-video'
    ) as HTMLVideoElement;

    if (!video) return;

    let maxPrintWidth = (7 * canvasWidth) / 8;
    let maxPrintHeight = (7 * canvasHeight) / 8;
    const x = (1 * canvasWidth) / 16;
    let y = (1 * canvasHeight) / 16;
    let width;
    let height;
    let offset = 0;

    if (screen && isScreenActive) {
        maxPrintWidth = canvasWidth / 4;
        maxPrintHeight = canvasHeight / 4;
        y = (3 * canvasHeight) / 8;
    }

    if (isVideoActive && videoElement) {
        width = videoElement.videoWidth;
        height = videoElement.videoHeight;
    } else {
        const posterImage = new Image();
        const _width = Math.min(canvasHeight / 2, canvasWidth / 2);
        context.fillStyle = '#333333';
        context.fillRect(x - 1, y - 1, maxPrintWidth + 2, maxPrintHeight + 2);
        context.fillStyle = '#FAFAFA';
        context.fillRect(x, y, maxPrintWidth, maxPrintHeight);
        // context.fill();
        // context.stroke();
        context.fillStyle = brand.background;
        posterImage.src = videoElement.poster;
        videoElement = posterImage;
        width = _width;
        height = _width;
        offset = 100;
    }
    fitImage(
        context,
        videoElement,
        x,
        y + offset / 2,
        maxPrintWidth,
        maxPrintHeight - offset,
        width,
        height
    );
    const labelHeight = screen && isScreenActive ? 0.1 * maxPrintHeight : 0.04 * maxPrintHeight;
    drawUserLabel(context, 'Allen', brand, x, y + maxPrintHeight - labelHeight, labelHeight);
};
const drawScreenShareVideo = (
    context: CanvasRenderingContext2D,
    video: boolean,
    screen: boolean,
    isScreenActive: boolean,
    canvasHeight: number,
    canvasWidth: number
) => {
    const screenElement = document.getElementById('screen-video') as HTMLVideoElement;
    if (!screen || !isScreenActive || !screenElement) return;
    let maxPrintWidth = (7 * canvasWidth) / 8;
    const maxPrintHeight = (7 * canvasHeight) / 8;
    let x = canvasWidth / 16;
    const y = canvasHeight / 16;
    if (video) {
        x = (6 * canvasWidth) / 16 - canvasHeight / 16;
        maxPrintWidth = (10 * canvasWidth) / 16;
    }
    context.save();
    context.fillStyle = '#000000';
    context.fillRect(x, y, maxPrintWidth, maxPrintHeight);
    fitImage(
        context,
        screenElement,
        x,
        y,
        maxPrintWidth,
        maxPrintHeight,
        screenElement.videoWidth,
        screenElement.videoHeight
    );
    context.restore();
};
