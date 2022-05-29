import { createContext, useReducer } from "react";

// SETUP/INITIATE "STATE" PROPERTY TO BE SPREAD AMONG COMPONENTS
const INITIAL_STATE ={
    user: null,
    onLoading: false,
    error: null
};

// USE STATE ANYWHERE - PARSE TO ALL COMPONENTS
export const authContext = createContext(INITIAL_STATE)

// RENEW STATE BASED ON GIVEN HEADER - as ".type"
const authActionResponder = (state, action) => {
    switch (action.type) {
        case "startlogin":
            // All required params from search bar bundled as payload when parsing
            return {
                user: null,
                onLoading: true,
                error: null
            };
        case "loginSuccess":
            // All required params from search bar bundled as payload when parsing
            return {
                user: action.payload,
                onLoading: false,
                error: null
            };
        case "loginFail":
            // All required params from search bar bundled as payload when parsing
            return {
                user: null,
                onLoading: false,
                error: action.payload
            };
        case "logout":
            // All required params from search bar bundled as payload when parsing
            return {
                user: null,
                onLoading: false,
                error: null
            };
        default:
            return state
    }
};

// USEREDUCER FRAMEWORK BUILD THE RECEIVER [PARAM, RESPONDER] AND PROVIDER
export const AuthContextProvider = ({children}) => {

    // "dispatcher" is a function but parsed as a property 
    const [authState, authDispatcher] = useReducer(authActionResponder, INITIAL_STATE);

    return (
        <authContext.Provider 
            value={{
                user: state.user,
                onLoading: state.loading,
                error: state.error
            }}
        >
                {children}
        </authContext.Provider>)
}