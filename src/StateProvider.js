import React,{createContext, useContext,useReducer} from 'react'

// create context api 
export const StateContext = createContext();


// set the data in data layer
export const StateProvider = (props) => {
    return (
        <StateContext.Provider value={useReducer(props.reducer,props.initialState)} >
            {props.children}   
         </StateContext.Provider>
    )
};

// pull information  from data layer
export const useStateValue = () => useContext(StateContext)


