import {createContext, useContext, useState} from "react";

export const PairModalContext = createContext(undefined);

function PairModalProvider({children}) {
    const [pairModalOpen, togglePairModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const value = {
        pairModalOpen,
        togglePairModalOpen,
        searchQuery,
        setSearchQuery
    }

    return (
        <PairModalContext.Provider value = {value}>
            {children}
        </PairModalContext.Provider>
    );
}

const usePairModal = () => useContext(PairModalContext);

export {
    PairModalProvider,
    usePairModal
}