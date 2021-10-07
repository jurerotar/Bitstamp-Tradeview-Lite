import {createContext, useContext, useState} from "react";

export const CurrentPairContext = createContext(undefined);

function CurrentPairProvider({children}) {
    const [currentPair, setCurrentPair] = useState('BTC / USD');

    const value = {
        currentPair,
        setCurrentPair
    }

    return (
        <CurrentPairContext.Provider value = {value}>
            {children}
        </CurrentPairContext.Provider>
    );
}

const useCurrentPair = () => useContext(CurrentPairContext);

export {
    CurrentPairProvider,
    useCurrentPair
}