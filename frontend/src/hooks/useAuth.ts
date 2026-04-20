import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    return useContext(AuthContext);
};

//made by me as it is a custom hook : if someone try to use this hook outside the provider it will throw an error