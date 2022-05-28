import { createContext, useReducer } from "react";

// SETUP/INITIATE "STATE" PROPERTY TO BE SPREAD AMONG COMPONENTS
const INITIAL_STATE ={
    hotelcity: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    }
};

// USE STATE ANYWHERE - PARSE TO ALL COMPONENTS
export const dispatchContext = createContext(INITIAL_STATE)

// RENEW STATE BASED ON GIVEN HEADER - as ".type"
const actionResponder = (state, action) => {
    switch (action.type) {
        case "newSearch":
            // All required params from search bar bundled as payload when parsing
            return action.payload
        case "resetSearch":
            return INITIAL_STATE
        default:
            return state
    }
};

// USEREDUCER FRAMEWORK BUILD THE RECEIVER [PARAM, RESPONDER] AND PROVIDER
export const SerachOptionProvider = ({children}) => {

    // "dispatcher" is a function but parsed as a property 
    const [stateValue, dispatcher] = useReducer(actionResponder, INITIAL_STATE);

    return (
        <dispatchContext.Provider value={{
            hotelcity:stateValue.hotelcity, 
            dates:stateValue.dates, 
            options: stateValue.options, 
            dispatcher}}>
            {children}
        </dispatchContext.Provider>)
}