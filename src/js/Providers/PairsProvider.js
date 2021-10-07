import {createContext, useContext, useState, useEffect} from "react";

export const PairsContext = createContext(undefined);

function PairsProvider({children}) {
    const [pairs, setPairs] = useState([]);
    const [loadingPairs, setLoadingPairs] = useState(true);

    const fetchPairs = async () => {
        const data = await (await fetch('https://api.jurerotar.si/bitstamp/pairs.json')).json();
        setPairs(data);
        setLoadingPairs(false);

    }

    useEffect(() => {
        fetchPairs();
    }, []);

    const value = {
        pairs,
        loadingPairs
    }
    return (
       <PairsContext.Provider value = {value}>
            {children}
        </PairsContext.Provider>
    );
}

const usePairs = () => useContext(PairsContext);

export {
    PairsProvider,
    usePairs
}