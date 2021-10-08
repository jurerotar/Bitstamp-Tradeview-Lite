import {usePairs} from '../../../Providers/PairsProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useModals} from "../../../Providers/ModalsProvider";
import PairModal from "./PairModal";

export default function SelectedPair() {
    const {pairsLoaded, selectedPairData} = usePairs();
    const {isPairsModalOpen, setIsPairsModalOpen} = useModals();

    return (pairsLoaded && selectedPairData !== null) ? (
        <div className="flex items-center relative w-full">
            <button className="text-blue-400" onClick={() => setIsPairsModalOpen(true)}>
                <span className="font-semibold mr-2">{selectedPairData.pair}</span>
                <FontAwesomeIcon icon = "chevron-right" />
            </button>
            <div className="ml-4 flex items-center">
                <span className="text-gray-300 mr-2">{selectedPairData.convert_to}</span>
                <span className="font-medium text-white">{selectedPairData.base_price}</span>
            </div>
            {(isPairsModalOpen) ? <PairModal /> : null}
        </div>
    ) : null;


}