/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, ReactNode, FC } from "react";

interface UserDetails {
    username: string;
    email: string;
}

interface UserContextType {
    isAuthenticated: boolean;
    userDetails: UserDetails | null;
    sessionExpired: boolean;
    role?: string;
    loading: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setUserDetails: (value: UserDetails) => void;
    setSessionExpired: (value: boolean) => void;
    setRole: (value: string) => void;
    setLoading: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | any>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);
    const [role, setRole] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    
    const contextValue: UserContextType = {
        isAuthenticated,
        userDetails,
        sessionExpired,
        role,
        loading,
        setIsAuthenticated,
        setUserDetails,
        setSessionExpired,
        setRole,
        setLoading
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}