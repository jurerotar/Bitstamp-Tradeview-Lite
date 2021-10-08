import {createContext, useContext, useState, useEffect} from "react";

export const PairsContext = createContext(undefined);

function PairsProvider({children}) {
    const [pairs, setPairs] = useState(null);
    const [pairsLoaded, setPairsLoaded] = useState(false);
    const [selectedPair, setSelectedPair] = useState('BTC / USD');
    const [selectedPairData, setSelectedPairData] = useState(null);

    const findSelectedPairData = (data) => data.find(pair => pair.pair === selectedPair);

    useEffect(() => {
        if(!pairsLoaded) {
            const fetchPairs = async () => await (await fetch('https://api.jurerotar.si/bitstamp/pairs.json')).json();
            (async () => {
                const data = await fetchPairs();
                setPairs(await data);
                setSelectedPairData(findSelectedPairData(data));
                setPairsLoaded(true);
            })();
        }
    }, []);

    useEffect(() => {
        console.log("pairs", pairsLoaded)
    }, [pairs]);


    // useEffect(() => {
    //     if(!pairsLoaded) {
    //         setSelectedPairData(findSelectedPairData(pairs));
    //     }
    // }, [selectedPair]);

    const value = {
        pairs,
        pairsLoaded,
        selectedPair,
        setSelectedPair,
        selectedPairData
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