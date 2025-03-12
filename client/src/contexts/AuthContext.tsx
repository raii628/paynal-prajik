/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, ReactNode, FC } from "react";

interface UserDetails {
    id: number;
    username: string;
    email: string;
}

interface UserContextType {
    isAuthenticated: boolean;
    userDetails: UserDetails | null;
    sessionExpired: boolean;
    role?: string;
    loading: boolean;
    profileImage?: string;
    setIsAuthenticated: (value: boolean) => void;
    setUserDetails: (value: UserDetails) => void;
    setSessionExpired: (value: boolean) => void;
    setRole: (value: string) => void;
    setLoading: (value: boolean) => void;
    setProfileImage?: (value: string) => void;
}

const UserContext = createContext<UserContextType | any>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);
    const [role, setRole] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string>("");
    
    const contextValue: UserContextType = {
        isAuthenticated,
        userDetails,
        sessionExpired,
        role,
        loading,
        profileImage,
        setIsAuthenticated,
        setUserDetails,
        setSessionExpired,
        setRole,
        setLoading,
        setProfileImage
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