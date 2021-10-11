import {createContext, useContext, useState, useEffect} from "react";

export const PairsContext = createContext(undefined);

function PairsProvider({children}) {
    const [pairs, setPairs] = useState(null);
    const [selectedPair, setSelectedPair] = useState('BTC / USD');
    const [selectedPairData, setSelectedPairData] = useState(null);
    const [selectedPairBasePrice, setSelectedPairBasePrice] = useState(null);
    const [pairsAvailable, setPairsAvailable] = useState(false);

    useEffect(() => {
        const fetchPairs = async () => await (await fetch('https://api.jurerotar.si/bitstamp/pairs.json')).json();
        (async () => {
            const data = await fetchPairs();
            setPairs(await data);
        })();
    }, []);

    useEffect(() => {
        const findSelectedPairData = (data) => data.find(pair => pair.pair === selectedPair);

        if(pairs) {
            setPairsAvailable(false);

            setSelectedPairData(findSelectedPairData(pairs));
            setSelectedPairBasePrice(findSelectedPairData(pairs).base_price);

            setPairsAvailable(true);
        }
    }, [pairs, selectedPair]);

    const value = {
        pairs,
        pairsAvailable,
        selectedPair,
        setSelectedPair,
        selectedPairData,
        selectedPairBasePrice,
        setSelectedPairBasePrice
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