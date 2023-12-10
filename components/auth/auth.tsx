"use client";
import React, {
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@nextui-org/react";
import { FirebaseContext } from "@/providers/firebase-provider";

export const Auth: React.FC<PropsWithChildren> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>("");
    const [isSignedIn, setSignedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = window.localStorage.getItem("access_token");
        setAccessToken(token);
        setSignedIn(Boolean(token));
    }, []);

    const provider = useMemo(() => {
        return new GoogleAuthProvider();
    }, []);

    const { auth } = useContext(FirebaseContext);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    setSignedIn(true);

                    window.localStorage.setItem("access_token", token ?? "");
                    console.log("credential", credential);
                    console.log("result", result);
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <div>
            {isSignedIn ? (
                children
            ) : (
                <div>
                    <Button onClick={signIn}>Sign in</Button>
                </div>
            )}
        </div>
    );
};
