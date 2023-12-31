export const fitImage = (
    ctx: CanvasRenderingContext2D,
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
    actualWidth: number,
    actualHeight: number
) => {
    const scaleX = width / actualWidth;
    const scaleY = height / actualHeight;
    const scale = Math.min(scaleX, scaleY);
    const drawX = x + (width - actualWidth * scale) / 2;
    const drawY = y + (height - actualHeight * scale) / 2;
    ctx.drawImage(image, drawX, drawY, actualWidth * scale, actualHeight * scale);
    return { x: drawX, y: drawY, scale };
};

export const remToPx = (rem: number) =>
    parseFloat(getComputedStyle(document.documentElement).fontSize) * rem;
