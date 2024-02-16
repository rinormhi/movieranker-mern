import { Dispatch, SetStateAction } from "react";
import { User } from "../interfaces/User";

export interface UserContextProps {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    resetUser: () => void;
}