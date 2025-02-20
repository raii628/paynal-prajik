/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* 
    This context will be used throughout the app for authentication 
    Tentative changes may occur here
*/

import { createContext, FC, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [session, setSession] = useState<boolean>(false);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                session,
                setSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);