import { createContext } from "react";
import { UserType } from "../utils/types";

export const AuthContext = createContext<unknown>(null);
export type AuthContextType = {
    user: UserType;
    login: (user: UserType) => void;
    logout: () => void;
    setUser: (user: UserType | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    currentTheme: string;
    setCurrentTheme: (currentTheme: string) => void;
    activeState: string;
    setActiveState: (state: string) => void;
    isAuthPage: boolean;
    setIsAuthPage: (isAuthPage: boolean) => void;
}

export const NavbarContext = createContext<unknown>(null);
export type NavbarContextType = {
    title: string;
    setTitle: (title: string) => void;
    currentTheme: string;
    hideNavbar: boolean;
    setCurrentTheme: (t: string) => void;
    setDocumentTitle: (t: string) => void;
    setHideNavbar: (t: boolean) => void;
}