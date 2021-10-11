import {createContext, useContext, useState} from "react";

export const PairsSearchQueryContext = createContext(undefined);

function PairsSearchQueryProvider({children}) {
    const [searchQuery, setSearchQuery] = useState('');

    const value = {
        searchQuery,
        setSearchQuery,
    }

    return (
        <PairsSearchQueryContext.Provider value = {value}>
            {children}
        </PairsSearchQueryContext.Provider>
    );
}

const usePairsSearchQuery = () => useContext(PairsSearchQueryContext);

export {
    PairsSearchQueryProvider,
    usePairsSearchQuery
}