import { createContext, useReducer } from "react";

const UserContext = createContext();


const UserProvider = ({ children }) => {

    const UserReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_USER':
                return [...state, action.payload];
            case 'EDIT_USER':
                return action.payload;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(UserReducer, {
        username: "null",
        userID: "null",
        age:"null",
        grade: "null",
        major: "null",
        aboutMe: "null",
        interestIds: [],
        profilePic: "placeholder",
        interests: []} ); //DEFAULT VALUE FOR USER INFO IN CONTEXT


    return (
        <UserContext.Provider value={{state, dispatch}}>
            { children }
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };