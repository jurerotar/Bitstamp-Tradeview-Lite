import {createChart} from 'lightweight-charts';
import {useEffect, useState} from "react";
import {useCurrentTrades} from "../../../Providers/TradesProvider";
import {graphOptions} from "../../../Plugins/constants";

export default function PriceChart() {
    const {currentTrades, currentTradesLoaded} = useCurrentTrades();
    const [chart, setChart] = useState(null);

    const resize = () => {
        if(chart && currentTradesLoaded) {
            chart.remove();
            setChart(createChart(document.querySelector('#price-chart'), graphOptions));
        }
    }

    const chartData = (trades) => trades.reverse().map(trade => {
        return {
            time: trade.timestamp,
            value: trade.price
        }
    });


    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [currentTradesLoaded, chart]);

    useEffect(() => {
        if (currentTradesLoaded) {
            const data = chartData(currentTrades);
            setChart(createChart(document.querySelector('#price-chart'), graphOptions));
            if(chart) {
                chart.addAreaSeries().setData(data);
                chart.timeScale().setVisibleLogicalRange({
                    from: 0,
                    to: 10
                });
                // chart.timeScale().setVisibleRange({
                //     from: data[data.length - 1].time / 1000,
                //     to: data[0].time / 1000
                // });
            }
        }
        return () => (chart) ? chart.remove() : void(0);
    }, [currentTradesLoaded]);

    // This hook dynamically adds new values to chart from currentTrades context
    useEffect(() => {
        if(currentTradesLoaded && chart) {
            chart.addAreaSeries().update({
                time: currentTrades[0].timestamp / 1000,
                value: currentTrades[0].value
            });
        }
    }, [currentTrades]);

    return (
        <div className="flex h-full w-full z-0 min-h-xs" id="price-chart">

        </div>
    );
}