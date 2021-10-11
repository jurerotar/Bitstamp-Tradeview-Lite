import {useState, useEffect} from 'react';

export const randomIntFromInterval = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));

export const domainRange = (basePrice) => {
    // Exponent tells us the base of the number
    const exponent = Math.trunc(Math.log10(basePrice || 1));
    // Get the first digit by dividing number with it's base
    const firstDigit = Math.trunc(basePrice / 10 ** exponent);
    if (exponent > 0) {
        // Check if lower limit is higher than 0
        const lowerLimit = (firstDigit - 1) * 10 ** exponent;
        return [(lowerLimit >= 0) ? lowerLimit : 0, (firstDigit + 2) * 10 ** exponent]
    }

    return [10 ** (exponent - 1), (firstDigit + 1) * 10 ** exponent];
}


function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}