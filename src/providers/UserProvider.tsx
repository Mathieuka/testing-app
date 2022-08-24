import { useNavigate } from "react-router-dom";
import React, { createContext, useMemo, useState, ReactElement} from "react";
import axios from "axios";

interface tUser {
    name: string | null;
    clientId: string | null;
}

interface tUserContext {
    user: tUser;
    handleLogin: (email: string) => Promise<void>;
    handleLogout: () => Promise<void>;
}

export const UserContext = createContext<tUserContext>({ } as tUserContext);

export const useUserContext = (): tUserContext => {
    const clientIdFromSessionStorage = sessionStorage.getItem("clientId");
    const nameFromSessionStorage = sessionStorage.getItem("name");
    const [user, setUser] = useState<tUser>({ name: nameFromSessionStorage || null, clientId: clientIdFromSessionStorage || null });
    const navigate = useNavigate();

    const handleLogin = async (email: string) => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/secured-log-in", {
                email
            });
            if (response?.status === 200) {
                setUser({
                    name: response?.data?.name,
                    clientId: response?.data?.clientId
                });
                sessionStorage.setItem("clientId", response?.data?.clientId);
                sessionStorage.setItem("name", response?.data?.name);
                navigate("/cockpit");
            }
        } catch(e: unknown) {
            console.error("Wrong email buddy");
        }

    };

    const handleLogout = async () => {
        try {
            sessionStorage.removeItem("clientId");
            sessionStorage.removeItem("name");
            navigate("/");
            await axios.post("http://localhost:8000/api/auth/log-out", {
                clientId: user?.clientId
            });   
        } catch(e: unknown) {
            console.error("Something Wrong");
        }
    };

    const contextValue = useMemo(
        () => ({
            user,
            handleLogin,
            handleLogout
        }),
        [user]
    );

    return contextValue;
};

const UserProvider = ({ children }: { children: ReactElement }) => {
    const context = useUserContext();

    return <UserContext.Provider value={context}>{children}</UserContext.Provider>;

};

export default UserProvider;