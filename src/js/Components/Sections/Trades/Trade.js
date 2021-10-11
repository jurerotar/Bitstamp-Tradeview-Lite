import { CSSTransition } from 'react-transition-group';
import {useEffect, useRef, useState} from "react";

export default function Trade({trade, isPositive, showAnimation}) {

    // This is used only to fix CSS transition bug
    const nodeRef = useRef(null)

    // This is basically to make sure CSS transition works
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if(trade !== null) {
            setLoaded(true);
        }
    }, [])

    // Formats the price based on amount of digits
    const formatPrice = (price) => {
        const integerLength = Number.parseInt(price).toString().length;
        return (integerLength < 2) ? price : price;
    }

    // If traded amount has less than 6 decimals, we add gray zeros to mimic Bitstamp's design
    const addTrailingZeros = (amount) => {
        if(amount.toString() === '1' || amount.toString() === '0') {
            return <span>
                <span className="text-white">{amount}.</span>
                <span className = "text-gray-500">{'0'.repeat(6)}</span>
            </span>
        }
        const amountLength = amount.toString().length;
        return (amountLength >= 8) ? amount :
        <span>
            <span className="text-white">{amount}</span>
            <span className = "text-gray-500">{'0'.repeat(8 - amountLength)}</span>
        </span>
    }

    return (
        <CSSTransition
            timeout = {{exit: 400, enter: 400}}
            nodeRef={nodeRef}
            in = {loaded}
            enter = {showAnimation}
            exit = {showAnimation}
            classNames = {isPositive ? 'new-trade-positive' : 'new-trade-negative'}>
            <div ref={nodeRef} className="flex flex-row justify-evenly overflow-x-hidden pr-1" style = {{marginBottom: '1px'}}>
                <span className="flex flex-1 justify-start mr-2 relative" style = {{maxWidth: '25px'}}>
                    <span className={`flex flex-1 justify-start opacity-50 absolute left-0 top-0 h-full ${(isPositive) ? 'bg-green-default' : 'bg-red-default'}`}
                        style = {{ width: `${trade.normalized_amount}px`, minWidth: '3px'}} />
                </span>
                <p className=" items-center text-xs text-white">{addTrailingZeros(trade.amount)}</p>
                <p className="flex flex-1 justify-end items-center text-xs text-gray-200">{new Date(trade.timestamp).toLocaleTimeString('sl-SI')}</p>
                <p className={`flex flex-1 justify-end items-center text-xs ${(isPositive) ? 'text-green-default' : 'text-red-default'}`}>
                    {formatPrice(trade.price)}
                </p>
            </div>
        </CSSTransition>
    );
}
