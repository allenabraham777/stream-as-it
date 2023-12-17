export const getFgColor = (color: string) => {
    let red: number, green: number, blue: number;
    if (color.includes('rgb')) {
        const [_red, _green, _blue] = color
            .replace('rgb', '')
            .replace('(', '')
            .replace(')', '')
            .replaceAll(' ', '')
            .split(',');
        red = parseInt(_red);
        green = parseInt(_green);
        blue = parseInt(_blue);
    } else {
        const rgb = hex2rgb(color);
        red = rgb.red;
        green = rgb.green;
        blue = rgb.blue;
    }
    const intensity = red * 0.299 + green * 0.587 + blue * 0.114;

    if (intensity > 186) return '#000000';
    return '#FFFFFF';
};

export const hex2rgb = (hex: string) => {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);

    // return {r, g, b}
    return { red, green, blue };
};
