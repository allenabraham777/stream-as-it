export const brand = Object.freeze({
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
});

export const shapesList = Object.keys(brand.shapes);
export const backgroundList: { key: string; color: string }[] = Object.keys(brand.backgrounds).map(
    (key: string) => ({
        key,
        color: brand.backgrounds[key as keyof typeof brand.backgrounds]
    })
);
