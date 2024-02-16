import { createContext, useState } from "react";
import { UserContextProps } from "../interfaces/UserContextProps";
import { UserProviderProps } from "../interfaces/UserProviderProps";
import { User } from "../interfaces/User";

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

const getInitialUser = (): User => ({
    _id: "",
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    registrationSucceed: false,
    favoriteMovies: []
});

const UserProvider = ({ children }: UserProviderProps) => {

    const [user, setUser] = useState(getInitialUser);

    const resetUser = () => {
        setUser(getInitialUser());
    }

    return (
        <UserContext.Provider value={{
            user, setUser, resetUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;