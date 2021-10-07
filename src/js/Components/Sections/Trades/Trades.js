import SectionTitle from "../../Common/SectionTitle";
import {usePairs} from "../../../Providers/PairsProvider";
import {useCurrentPair} from "../../../Providers/CurrentPairProvider";
import {useEffect, useState} from "react";
import {randomIntFromInterval} from "../../../Plugins/functions";

export default function Trades() {
    const {pairs, loadingPairs} = usePairs();
    const {currentPair} = useCurrentPair();

    const [trades, setTrades] = useState([]);
    const [tradesLoaded, setTradesLoaded] = useState(true);

    // We'll create fake trades around the base price, since we don't have access to actual data
    const createTrades = (basePrice, amountOfTrades = 100, hasRandomTime = true) => {
        const maxTradeAmount = 5;
        const minTradeAmount = 0;

        return [...Array(amountOfTrades).keys()].map((el, index) => {
            const tradedAmount = (Math.random() * (maxTradeAmount - minTradeAmount) + minTradeAmount).toFixed(6);
            const timestamp = hasRandomTime ? (Date.now() - randomIntFromInterval(0, 5000) * 10000) : Date.now();
            return {
                id: timestamp - index,
                amount: tradedAmount,
                price: basePrice - randomIntFromInterval(-basePrice / 10, basePrice / 10),
                timestamp: timestamp
            }
        }).sort((a, b) => b.timestamp - a.timestamp);
    }

    // Colors the price based on previous price
    const colorPrice = (currentPrice, previousPrice) => (currentPrice >= previousPrice) ? 'text-green-500' : 'text-red-500';

    const formatPrice = (price) => {
        const integerLength = Number.parseInt(price).toString().length;
        return (integerLength < 2) ? price.toFixed(5) : price.toFixed(2);
    }

    useEffect(() => {
        if(!loadingPairs) {
            const basePrice = pairs.find(pair => pair.pair === currentPair)?.base_price;
            setTradesLoaded(false);
            setTrades([...createTrades(basePrice, 100)]);
            setTradesLoaded(true);
        }
    }, [pairs, loadingPairs, setTrades, currentPair]);

    // Create interval that creates new trades periodically
    useEffect(() => {
        if(!loadingPairs) {
            const interval = setInterval(() => {
                const basePrice = pairs.find(pair => pair.pair === currentPair)?.base_price;
                const previousTrades = [...trades];
                previousTrades.pop();
                previousTrades.unshift(...createTrades(basePrice, 1, false))
                setTrades(previousTrades);
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [pairs, loadingPairs, trades, setTrades, currentPair]);


    const tradeList = (tradesLoaded) ? trades.map((trade, index) => {
        return <div key = {trade.id} className="flex flex-row justify-evenly overflow-x-hidden">
            <p className="flex flex-1 justify-end items-center text-xs text-white">{trade.amount}</p>
            <p className="flex flex-1 justify-end items-center text-xs text-gray-200">{new Date(trade.timestamp).toLocaleTimeString('sl-SI')}</p>
            <p className={`flex flex-1 justify-end items-center text-xs ${colorPrice(trades[index].price, trades[index + 1]?.price || 0)}`}>{formatPrice(trade.price)}</p>
        </div>
    }) : null;
    return (
        <div className = "trades rounded-sm">
            <SectionTitle title = "Trades" />
            <div className="flex flex-col">
                <div className="flex flex-row justify-evenly overflow-x-hidden bg-gray-750 border-b border-gray-600 px-2">
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">Amount</p>
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">Time</p>
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">Price</p>
                </div>
            </div>
            <div className="px-1 bg-gray-750 max-h-96 md:max-h-80 lg:max-h-trades overflow-y-scroll rounded-b-sm">
                {tradeList}
            </div>
        </div>
    );
}

