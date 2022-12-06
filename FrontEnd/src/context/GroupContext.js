import { createContext, useContext,useReducer, useState} from "react";

export const GroupContext = createContext();

export const GroupContextProvider = ({children}) => {
    const [currentGroup] = useState({});

    return (
        <GroupContext.Provider value={{ currentGroup }}>
            {children}
        </GroupContext.Provider>
    );
};