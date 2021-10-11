import {createContext, useContext, useEffect, useState} from "react";

export const DevicePropertiesContext = createContext(undefined);

function DevicePropertiesProvider({children}) {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    const value = {
        width,
        height,
    }

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <DevicePropertiesContext.Provider value = {value}>
            {children}
        </DevicePropertiesContext.Provider>
    );
}

const useDeviceProperties = () => useContext(DevicePropertiesContext);

export {
    DevicePropertiesProvider,
    useDeviceProperties
}