import SectionTitle from "../../Common/SectionTitle";
import {useTrades} from "../../../Providers/TradesProvider";
import {useEffect} from "react";

export default function Trades() {
    const {trades, tradesLoaded, hasUpdatedTrades} = useTrades();

    // Colors the price based on previous price
    const colorPrice = (currentPrice, previousPrice) => {
        if(!previousPrice) {
            previousPrice = 0;
        }
        return (currentPrice >= previousPrice) ? 'text-green-500' : 'text-red-500';
    }

    // Formats the price based on amount of digits
    const formatPrice = (price) => {
        const integerLength = Number.parseInt(price).toString().length;
        return (integerLength < 2) ? price.toFixed(5) : price.toFixed(2);
    }

    useEffect(() => {
        if(tradesLoaded) {
            console.log(trades);
        }
    }, [trades, tradesLoaded, hasUpdatedTrades]);

    return (
        <div className="trades rounded-sm">
            <SectionTitle title="Trades"/>
            <div className="flex flex-col">
                <div
                    className="flex flex-row justify-evenly overflow-x-hidden bg-gray-750 border-b border-gray-600 px-2">
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">Amount</p>
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">Time</p>
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">Price</p>
                </div>
            </div>
            <div className="px-1 bg-gray-750 max-h-96 md:max-h-80 lg:max-h-trades overflow-y-scroll rounded-b-sm">
                {(tradesLoaded) ? trades.map((trade, index) => {
                    return <div key={trade.id} className="flex flex-row justify-evenly overflow-x-hidden">
                        <p className="flex flex-1 justify-end items-center text-xs text-white">{trade.amount}</p>
                        <p className="flex flex-1 justify-end items-center text-xs text-gray-200">{new Date(trade.timestamp).toLocaleTimeString('sl-SI')}</p>
                        <p className={`flex flex-1 justify-end items-center text-xs ${colorPrice(trades[index].price, trades[index + 1]?.price)}`}>
                            {formatPrice(trade.price)}
                        </p>
                    </div>
                }) : null}
            </div>
        </div>
    );
}

