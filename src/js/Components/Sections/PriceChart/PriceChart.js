import {useEffect, useState} from "react";
import {useTrades} from "../../../Providers/TradesProvider";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine} from 'recharts';
import {usePairs} from "../../../Providers/PairsProvider";
import {domainRange} from "../../../Helpers/functions";
import {useDeviceProperties} from "../../../Providers/DevicePropertiesProvider";
import {breakpoints} from "../../../Helpers/constants";
import SectionTitle from "../../Common/SectionTitle";

export default function PriceChart() {
    const {trades} = useTrades();
    const {selectedPairData, selectedPairBasePrice} = usePairs();
    const {width} = useDeviceProperties();

    const [data, setData] = useState([]);

    useEffect(() => {
        const amountOfDataPoints = (width) => {
            if (width >= breakpoints.lg) {
                return 50;
            } else if (width >= breakpoints.md) {
                return 30;
            } else {
                return 20;
            }
        }
        if (trades.length) {
            const data = trades.filter((trade, index) => index <= amountOfDataPoints(width)).reverse().map(trade => {
                return {
                    price: trade.price,
                    time: new Date(trade.timestamp).toLocaleTimeString()
                }
            });
            setData(data);
        }
    }, [trades, selectedPairData, width])

    return (selectedPairData) ? (
        <div className= "flex flex-col bg-gray-750 rounded-sm">
            <SectionTitle title = "Price chart" />
            <ResponsiveContainer width="99%" minHeight = {250} height = "99%"  minWidth={0}>
                <AreaChart
                    width="100%"
                    height="100%"
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid stroke = "#4E6166" strokeDasharray="3 3"/>
                    <XAxis stroke = "#4E6166" dataKey="time"/>
                    <YAxis type="number" stroke = "#4E6166" allowDecimals = {false} domain={domainRange(selectedPairBasePrice)} dataKey="price"/>
                    <Tooltip/>
                    {/*<ReferenceLine y={basePrice} stroke="#4E6166"/>*/}
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#159f49"
                        dot={true}
                        fill="#159F49"
                        fillOpacity={0.2}
                        isAnimationActive={false}
                        animationDuration={500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    ) : null;
}