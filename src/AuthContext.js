import React ,{ useContext,useEffect,useState } from "react";
import { auth } from "./firebase";

const authCtx = React.createContext();

export const useAuth = () => {
    return useContext(authCtx);
}

export const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [currUser,setCurrUser] = useState();

    const signUp = (email,pwd) =>{
        return auth.createUserWithEmailAndPassword(email,pwd)
    }

    const logIn = (email,pwd) => {
        return auth.signInWithEmailAndPassword(email,pwd)
    }

    const logOut = () => {
        return auth.signOut();
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrUser(user);
            setLoading(false);
        })
        return unsub
    },[])
    

    const value = {
        currUser,
        signUp,
        logIn,
        logOut
    }
    return(
        <authCtx.Provider value={value}>
            {!loading && children}
        </authCtx.Provider>
    )
}