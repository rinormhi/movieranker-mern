import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface User {
    _id: string;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    isAuthenticated: boolean;
    loggedIn: boolean;
    registrationSucceed: boolean;
}

interface UserContextProps {
    _id: string;
    setId: Dispatch<SetStateAction<string>>;
    fname: string;
    setFname: Dispatch<SetStateAction<string>>;
    lname: string;
    setLname: Dispatch<SetStateAction<string>>;
    uname: string;
    setUname: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    registrationSucceed: boolean;
    setRegistrationSucceed: Dispatch<SetStateAction<boolean>>;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    initializedUser: User
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

const initializedUser = {
    _id: "",
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    isAuthenticated: false,
    loggedIn: false,
    registrationSucceed: false
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [_id, setId] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationSucceed, setRegistrationSucceed] = useState(false);
    const [user, setUser] = useState(initializedUser);

    return (
        <>
            <UserContext.Provider value={{
                _id, setId,
                uname, setUname,
                fname, setFname,
                lname, setLname,
                loggedIn, setLoggedIn,
                email, setEmail,
                password, setPassword,
                confirmPassword, setConfirmPassword,
                registrationSucceed, setRegistrationSucceed,
                isAuthenticated, setIsAuthenticated,
                user, setUser,
                initializedUser
            }}>
                {children}
            </UserContext.Provider>
        </>
    );
}

export default UserProvider;