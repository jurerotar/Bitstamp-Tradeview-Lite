import DefaultLayout from "../Layouts/DefaultLayout";
import SelectedPair from "../Components/Sections/Pairs/SelectedPair";
import Trades from "../Components/Sections/Trades/Trades";
import Login from "../Components/Sections/Login/Login";
import DepthChart from "../Components/Sections/DepthChart/DepthChart";
import OrderBook from "../Components/Sections/OrderBook/OrderBook";
import {PairsProvider} from "../Providers/PairsProvider";
import {ModalsProvider} from "../Providers/ModalsProvider";
import {TradesProvider} from "../Providers/TradesProvider";
import {PairsSearchQueryProvider} from "../Providers/PairsSearchQueryProvider";
import PriceChart from "../Components/Sections/PriceChart/PriceChart";
import {DevicePropertiesProvider} from "../Providers/DevicePropertiesProvider";


export default function Tradeview() {
    return (
        <DevicePropertiesProvider>
            <DefaultLayout>
                <PairsProvider>
                    <TradesProvider>
                        <main className="flex flex-col p-2">
                            <div className="flex justify-between py-2 mb-2">
                                <ModalsProvider>
                                    <PairsSearchQueryProvider>
                                        <SelectedPair/>
                                    </PairsSearchQueryProvider>
                                </ModalsProvider>
                            </div>
                            <div className="grid gap-2 grid-cols-1
                            md:grid-cols-12 md:grid-rows-tablet-auto
                            lg:grid-rows-6 lg:max-h-widescreen">
                                <div className="grid
                                col-start-1 col-span-1
                                md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-1
                                lg:col-span-2 lg:row-span-6
                                order-1">
                                    <Trades/>
                                </div>
                                <div className="grid min-h-xs
                                md:col-start-5 md:col-span-8 md:row-start-1 md:row-span-1
                                lg:col-start-3 lg:col-span-8 lg:row-span-3
                                order-2">
                                    <PriceChart/>
                                </div>
                                <div className="grid
                                md:col-start-1 md:col-span-4 md:row-start-3 md:row-span-1
                                lg:col-start-11 lg:col-span-2 lg:row-start-1 lg:row-span-6
                                order-5">
                                    <Login/>
                                </div>
                                <div className="grid
                                md:col-start-1 md:col-span-4 md:row-start-2 md:row-span-1
                                lg:col-start-3 lg:col-span-4 lg:row-start-4 lg:row-span-3
                                order-3">
                                    <DepthChart/>
                                </div>
                                <div className="grid
                                md:col-start-5 md:col-span-8 md:row-start-2 md:row-span-2
                                lg:col-start-7 lg:col-span-4 lg:row-start-4 lg:row-span-3
                                order-4">
                                    <OrderBook/>
                                </div>
                            </div>
                        </main>
                    </TradesProvider>
                </PairsProvider>
            </DefaultLayout>
        </DevicePropertiesProvider>
    );
}

