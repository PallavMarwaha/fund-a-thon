import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate, redirect } from "react-router-dom";

export function AuthNotRequired(props) {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            redirect("/");
        }
    }, [isAuthenticated, navigate]);

    return <>{props.children}</>;
}
