import SectionTitle from "../../Common/SectionTitle";
import {useTrades} from "../../../Providers/TradesProvider";
import Trade from "./Trade";
import {useEffect, useRef} from "react";
import {usePairs} from "../../../Providers/PairsProvider";

export default function Trades() {
    const {selectedPair} = usePairs();
    const {trades, tradesLoaded} = useTrades();

    // Prevent showing the flashing animation on initial trade render
    const showAnimations = useRef(false);
    useEffect(() => {
        showAnimations.current = false;
    }, [selectedPair]);

    // Show the flashing animation on later periodic trades
    useEffect(() => {
        if(tradesLoaded) {
            showAnimations.current = true;
        }
    }, [tradesLoaded]);

    // Colors the price based on previous price
    const isPositive = (currentPrice, previousPrice) => {
        if(!previousPrice) {
            previousPrice = 0;
        }
        return currentPrice >= previousPrice;
    }

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
            <div className="bg-gray-750 max-h-96 md:max-h-80 lg:max-h-trades overflow-y-scroll rounded-b-sm">
                {/* Get just last 100 trades */}
                {(tradesLoaded) ? trades.filter((trade, index) => index <= 99).map((trade, index) => {
                    return <Trade showAnimation = {showAnimations.current} key = {trade.id} trade = {trade} isPositive={isPositive(trades[index]?.price, trades[index + 1]?.price)} />
                }) : null}
            </div>
        </div>
    );
}

