import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useModals} from "../../../Providers/ModalsProvider";
import {usePairs} from "../../../Providers/PairsProvider";
import {usePairsSearchQuery} from "../../../Providers/PairsSearchQueryProvider";

export default function PairModal() {
    const {setIsPairsModalOpen} = useModals();
    const {pairs, pairsAvailable, selectedPair, setSelectedPair} = usePairs();
    const {searchQuery, setSearchQuery} = usePairsSearchQuery();

    const colorChange = (change) => (change >= 0) ? 'text-green-500' : 'text-red-500';
    const isSelectedPair = (pair) => pair === selectedPair ? 'bg-gray-800' : 'hover:bg-gray-700';
    const setPairAndClose = (pair) => {
        setSelectedPair(pair);
        setIsPairsModalOpen(false);
    }

    const pairList = pairs.filter(pair => pair.pair.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(pair => {
            return <div onClick={() => setPairAndClose(pair.pair)}
                        className={`${isSelectedPair(pair.pair)} cursor-pointer duration-300 transition-colors px-2 flex flex-row justify-between py-2 sm:py-1 border border-gray-900 rounded-sm border-b-0`}
                        key={pair.id}>
                <p className="font-medium text-white text-xs sm:text-sm flex flex-1 justify-start items-center">{pair.pair}</p>
                <p className="font-medium text-white text-xs sm:text-sm flex flex-1 justify-start items-center">
                    <span className="font-light text-gray-500 mr-2">{pair.convert_to}</span> {pair.base_price}</p>
                <p className={`font-bold text-white text-xs flex flex-1 justify-end items-center ${colorChange(pair.change)}`}>{pair.change}%</p>
                <p className="font-bold text-white text-xs flex flex-1 justify-end items-center">{pair.volume / 1000} k</p>
            </div>
        });
    return (pairsAvailable) ? (
        <div
            className="flex flex-col z-10 absolute top-0 left-0 bg-gray-550 rounded-sm max-h-120 md:max-h-96 w-full md:w-screen max-w-pairs">
            <div
                className="flex justify-between rounded-tl-sm rounded-tr-sm items-center p-1 px-4 dark:bg-gray-1000 h-min-content">
                <h2 className="dark:text-white uppercase text-xs font-medium">
                    Pairs
                </h2>
                <button className="" onClick={() => setIsPairsModalOpen(false)}>
                    <FontAwesomeIcon className="text-gray-500" icon="times"/>
                </button>
            </div>
            <div className="flex flex-row justify-start items-center bg-gray-750 p-1">
                <label className="border bg-gray-1000 rounded-l-sm border-gray-200 px-1 border-r-0"
                       htmlFor="pair-modal-search">
                    <FontAwesomeIcon icon="search" className="text-white"/>
                </label>
                <input id="pair-modal-search"
                       className="bg-gray-1000 outline-none focus:border-0 focus:outline-none border-l-0 text-white px-1 rounded-r-sm border border-gray-200"
                       type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <div className="max-h-full flex flex-col">
                <div className="flex flex-row justify-evenly overflow-x-hidden bg-gray-750 p-2">
                    <p className="flex flex-1 font-medium justify-start items-center text-xs text-gray-500">Pair</p>
                    <p className="flex flex-1 font-medium justify-start items-center text-xs text-gray-500">Last
                        price</p>
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">24h change</p>
                    <p className="flex flex-1 font-medium justify-end items-center text-xs text-gray-500">24h volume</p>
                </div>
            </div>
            <div className="flex flex-col bg-gray-750 overflow-y-scroll">
                {pairList}
            </div>
        </div>
    ) : null;

}