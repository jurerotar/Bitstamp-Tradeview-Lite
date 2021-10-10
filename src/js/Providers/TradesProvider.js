import {createContext, useContext, useEffect, useRef, useState} from "react";
import {usePairs} from "./PairsProvider";
import {randomIntFromInterval} from "../Helpers/functions";

export const TradesContext = createContext(null);

function TradesProvider({children}) {
    const {pairsAvailable, selectedPair, selectedPairBasePrice, setSelectedPairBasePrice} = usePairs();

    const [trades, setTrades] = useState([]);
    const [tradesLoaded, setTradesLoaded] = useState(false);
    const [hasUpdatedTrades, setHasUpdatedTrades] = useState(false);
    const currentPair = useRef(null);


    // We'll create fake trades around the base price, since we don't have access to actual data
    const createTrades = (basePrice, amountOfTrades = 100, hasRandomTime = true) => {
        if(hasRandomTime) {
            console.log(basePrice);
        }
        return [...Array(amountOfTrades).keys()].map((el, index) => {
            // Price fluctuates +/- <= 3% around base price
            const fluctuation = randomIntFromInterval(-333, 333) / 10000;
            // Half of the trades end with multiple zeros to replicate actual user behaviour
            const isTradedAmountNice = randomIntFromInterval(1, 10) <= 5;

            // Math.random always returns a number in range (0,1), we parseFloat to remove trailing zeros
            const tradedAmount = (isTradedAmountNice) ? parseFloat((Math.random()).toFixed(randomIntFromInterval(2, 5))) : parseFloat((Math.random()).toFixed(6));

            const timestamp = hasRandomTime ? (Date.now() - randomIntFromInterval(0, 1000) * 5000) : Date.now();

            const price = formatPrice(basePrice - (basePrice *  fluctuation));
            return {
                id: timestamp - index,
                amount: tradedAmount,
                price: parseFloat(price) === 0 ? '0.001' : price,
                timestamp: timestamp
            }
        });
    }

    const formatPrice = (price) => {
        const integerLength = Math.trunc(price).toString().length;
        return price.toFixed(7 - (integerLength > 7 ? 2 : integerLength));
    }

    const updateTrades = (selectedPairBasePrice) => {
        setHasUpdatedTrades(false);
        const previousTrades = [...trades];
        const newTrade = createTrades(selectedPairBasePrice, 1, false);
        const updatedTrades = [...newTrade, ...previousTrades];
        setTrades(updatedTrades);
        // Base price is now determined by the price of last trade made
        setSelectedPairBasePrice(newTrade[0].price);
        setHasUpdatedTrades(true);
    }
    const sortByDateAsc = (a, b) => new Date(b) - new Date(a);
    const createDefaultTrades = () => createTrades(selectedPairBasePrice, 100, true).sort((a, b) => sortByDateAsc(a.timestamp, b.timestamp))

    useEffect(() => {
        if(currentPair.current !== selectedPair) {
            setTradesLoaded(false);
            setTrades([]);
        }
    }, [selectedPair]);

    useEffect(() => {
        if(pairsAvailable && currentPair.current !== selectedPair) {
            setTradesLoaded(false);
            const newTrades = createDefaultTrades();
            setTrades(newTrades);
            currentPair.current = selectedPair;
            setTradesLoaded(true);
        }
    }, [pairsAvailable, selectedPairBasePrice]);

    useEffect(() => {
        if(tradesLoaded && currentPair.current === selectedPair) {
            const interval = setInterval(() => updateTrades(selectedPairBasePrice), 4000);
            return () => clearInterval(interval);
        }
    }, [tradesLoaded, hasUpdatedTrades, selectedPairBasePrice]);

    const value = {
        trades,
        tradesLoaded,
        hasUpdatedTrades
    }

    return (
        <TradesContext.Provider value = {value}>
            {children}
        </TradesContext.Provider>
    );
}

const useTrades = () => useContext(TradesContext);

export {
    TradesProvider,
    useTrades
}