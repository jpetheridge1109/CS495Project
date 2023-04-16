//CONTEXT USAGE - IMPORT BELOW
import { useContext } from "react";
import { UserContext } from "./context/UserProvider"


//SAMPLE USAGE FOR CONTEXT, DO IN A FUNCTION/COMPONENT WRAPPED BY CONTEXT (SHOULD BE EVERYTHING)

const { state } = useContext(UserContext);
USERINFO = state; //SET ANY VARIABLE YOU WANT TO "state" OBJECT FROM CONTEXT, I.E. USERINFO

//ADDING TO CONTEXT STATE
const { dispatch } = useContext(UserContext);
dispatch({ type: 'ADD_USER', payload: { username: "kmccann", userID: "23kjklads" } })

//EDIT CONTEXT STATE (MAYBE FOR LOGGING OUT??), ASSUME LINE 12 IS ALREADY IN THE FILE
dispatch({ type: 'EDIT_USER', payload: { username: "loggedinusername", userID: "6765asd"}})