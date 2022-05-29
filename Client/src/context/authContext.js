import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE ={
    user: JSON.parse(localStorage.getItem("user")) || null,
    onLoading: false,
    error: null
};

export const authContext = createContext(INITIAL_STATE)

const authActionResponder = (state, action) => {
    switch (action.type) {
        case "startlogin":
            return {
                user: null,
                onLoading: true,
                error: null
            };
        case "loginSuccess":
            return {
                user: action.payload,
                onLoading: false,
                error: null
            };
        case "loginFail":
            return {
                user: null,
                onLoading: false,
                error: action.payload
            };
        case "logout":
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

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(authState.user))
    }, [authState.user])

    return (
        <authContext.Provider 
            value={{
                user: authState.user,
                onLoading: authState.onLoading,
                error: authState.error,
                authDispatcher
            }}
        >
                {children}
        </authContext.Provider>)
}