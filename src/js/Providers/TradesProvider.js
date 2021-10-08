import {createContext, useContext, useEffect, useState} from "react";
import {usePairs} from "./PairsProvider";
import {randomIntFromInterval} from "../Plugins/functions";

export const TradesContext = createContext(null);

function TradesProvider({children}) {
    const [trades, setTrades] = useState([]);
    const [tradesLoaded, setTradesLoaded] = useState(false);
    const [hasUpdatedTrades, setHasUpdatedTrades] = useState(false);

    const {pairsLoaded, selectedPair} = usePairs();

    // We'll create fake trades around the base price, since we don't have access to actual data
    const createTrades = (basePrice, amountOfTrades = 100, hasRandomTime = true) => {
        return [...Array(amountOfTrades).keys()].map((el, index) => {
            const tradedAmount = (Math.random()).toFixed(6);
            const timestamp = hasRandomTime ? (Date.now() - randomIntFromInterval(0, 1000) * 5000) : Date.now();
            return {
                id: timestamp - index,
                amount: tradedAmount,
                price: basePrice - randomIntFromInterval(-basePrice / 10, basePrice / 10),
                timestamp: timestamp
            }
        });
    }



    useEffect(() => {
        const updateTrades = () => {
            setHasUpdatedTrades(false);
            const previousTrades = [...trades];
            console.log(previousTrades);
            const updatedTrades = [...createTrades(selectedPair.base_price, 1, false), ...previousTrades];
            setTrades(updatedTrades);
            setHasUpdatedTrades(true);
        }
        const sortByDateAsc = (a, b) => new Date(b) - new Date(a);
        const createDefaultTrades = () => createTrades(selectedPair.base_price, 100, true).sort((a, b) => sortByDateAsc(a.timestamp, b.timestamp))


        if(pairsLoaded) {
            setTradesLoaded(false);
            setTrades(createDefaultTrades);
            setTradesLoaded(true);
            console.log('here')
            const interval = setInterval(updateTrades, 2000);
            return () => clearInterval(interval);
        }
    }, [selectedPair]);

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