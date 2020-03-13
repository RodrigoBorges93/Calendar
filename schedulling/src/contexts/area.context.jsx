import React, { useState, createContext } from 'react';

export const AreaContext = createContext();

export const AreaProvider = (props) => {
    const [area, setArea] = useState();
    return (
        <AreaContext.Provider value={[area, setArea]}>
            {props.children}
        </AreaContext.Provider>

    );
}