import { createContext, useState } from "react";
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationSucceed, setRegistrationSucceed] = useState(false);
    const [user, setUser] = useState("");

    return (
        <>
            <UserContext.Provider value={{
                uname, setUname,
                fname, setFname,
                lname, setLname,
                loggedIn, setLoggedIn,
                email, setEmail,
                password, setPassword,
                confirmPassword, setConfirmPassword,
                registrationSucceed, setRegistrationSucceed,
                isAuthenticated, setIsAuthenticated,
                user, setUser
            }}>
                {children}
            </UserContext.Provider>
        </>
    );
}

export default UserProvider;