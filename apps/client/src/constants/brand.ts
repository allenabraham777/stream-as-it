const constants = {
    colors: {
        default: '#1B98F5'
    },
    shapes: {
        RECTANGLE: 'RECTANGLE',
        BUBBLE: 'BUBBLE'
    },
    backgrounds: {
        default: '#FAFAFA',
        red: '#FF6263',
        indigo: '#383CC1',
        green: '#02B290',
        yellow: '#E5D68A'
    }
};

export const shapesList = Object.keys(constants.shapes);
export const backgroundList: { key: string; color: string }[] = Object.keys(
    constants.backgrounds
).map((key: string) => ({
    key,
    color: constants.backgrounds[key as keyof typeof constants.backgrounds]
}));

export default constants;
