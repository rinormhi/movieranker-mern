import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const MyProfile = () => {

    const { user } = useContext(UserContext);
    return (
        <>
            <div className="w-1/2 py-10 mx-auto text-center">
                <h1 className="text-5xl font-bold">Mein Profil</h1>
                <div>Name:</div>
                <div>{user.fname + user.lname}</div>
                <div>ID:</div>
                <div>{user._id}</div>
                <div>Username:</div>
                <div>{user.username}</div>
            </div>
        </>
    );
}

export default MyProfile;