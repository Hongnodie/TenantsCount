import { createContext, useReducer } from "react";

const INITIAL_STATE ={
    hotelcity: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    }
};

// USE ANYWHERE
export const dispatchContext = createContext(INITIAL_STATE)

const actionResponder = (state, action) => {
    switch (action.type) {
        case "newSearch":
            // All params from search bar
            return action.payload
        case "resetSearch":
            return INITIAL_STATE
        default:
            return state
    }
};

export const SCP = ({children}) => {
    // Job assigned to two components: stateValue & dispatch by the framework defined as useReducer in react npm
    const [stateValue, dispatch] = useReducer(actionResponder, INITIAL_STATE);

    return (
        <actionResponder.Provider value={{
            hotelcity:stateValue.hotelcity, 
            dates:stateValue.dates, 
            options: stateValue.options, 
            dispatch}}>
            {children}
        </actionResponder.Provider>)
}