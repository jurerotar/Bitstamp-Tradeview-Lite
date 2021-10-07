import {useCurrentPair} from '../../../Providers/CurrentPairProvider';
import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {usePairs} from "../../../Providers/PairsProvider";
import {usePairModal} from "../../../Providers/PairModalProvider";
import PairModal from "./PairModal";


export default function CurrentPair() {
    const {currentPair} = useCurrentPair();
    const {pairs, loadingPairs} = usePairs();
    const {pairModalOpen, togglePairModalOpen} = usePairModal();

    const [price, setPrice] = useState(null);
    const [currency, setCurrency] = useState(null);
    useEffect(() => {
        if(!loadingPairs) {
            const current = pairs.find(pair => pair.pair === currentPair);
            setPrice(current.base_price);
            setCurrency(current.convert_to);
        }
    }, [currentPair, loadingPairs, pairs]);

    return (
        <div className="flex items-center relative w-full">
            <button className="text-blue-400" onClick={() => togglePairModalOpen(true)}>
                <span className="font-semibold mr-2">{currentPair}</span>
                <FontAwesomeIcon icon = "chevron-right" />
            </button>
            <div className="ml-4 flex items-center">
                <span className="text-gray-300 mr-2">{currency}</span>
                <span className="font-medium text-white">{price}</span>
            </div>
            {(pairModalOpen) ? <PairModal /> : null}
        </div>

    );


}