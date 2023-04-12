import { createContext, useReducer } from "react";

const UserContext = createContext();


const UserProvider = ({ children }) => {

    const UserReducer = (state, action) => {
        return state;
    }

    const [state, dispatch] = useReducer(UserReducer, { user: [{ username: "null", userID: "null" }] });


    return (
        <UserContext.Provider value={{state, dispatch}}>
            { children }
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };