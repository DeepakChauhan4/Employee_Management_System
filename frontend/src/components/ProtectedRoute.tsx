import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProtectedRoute({ children }: any) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}

//if the token is not present in local storage then it will navigate to login page
//otherwise it will allow access to the protected route