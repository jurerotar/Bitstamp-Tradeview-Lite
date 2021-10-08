import {createContext, useContext, useState} from "react";

export const ModalsContext = createContext(undefined);

function ModalsProvider({children}) {
    const [isPairsModalOpen, setIsPairsModalOpen] = useState(false);

    const value = {
        isPairsModalOpen,
        setIsPairsModalOpen,
    }

    return (
        <ModalsContext.Provider value = {value}>
            {children}
        </ModalsContext.Provider>
    );
}

const useModals = () => useContext(ModalsContext);

export {
    ModalsProvider,
    useModals
}