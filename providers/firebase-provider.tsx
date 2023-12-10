import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { CONFIG } from "constants/firebase";

interface FirebaseContextInterface {
    app: any;
    auth: any;
}

const initialState = {
    app: null,
    auth: null,
};

export const FirebaseContext =
    createContext<FirebaseContextInterface>(initialState);

export const FirebaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<FirebaseContextInterface>(initialState);

    useEffect(() => {
        const app = initializeApp(CONFIG);
        const auth = getAuth(app);

        setState({ app, auth });
    }, []);

    return (
        <FirebaseContext.Provider value={state}>
            {children}
        </FirebaseContext.Provider>
    );
};
