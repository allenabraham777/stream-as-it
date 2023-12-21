import { useRef, useEffect } from 'react';

const useAnimationFrame = <T>(animateFunction: () => void, dependencies: T[] = []) => {
    const requestRef = useRef<number | null>();

    const loop = () => {
        animateFunction();
        requestRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current as number);
    }, [animateFunction, ...dependencies]);
};

export default useAnimationFrame;
