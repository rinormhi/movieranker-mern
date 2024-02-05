import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import validator from "validator";
import RegisterForm from "../components/RegisterForm";

function Register() {
    return (
        <RegisterForm />
    )
}


export default Register;