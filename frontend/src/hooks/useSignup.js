import { useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const {authUser, setAuthUser} = useAuth();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;
        setLoading(true);
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            })
            const data = await response.json();
            if (response.ok) {
                toast.success("Account created successfully")
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
            } else {
                toast.error(data.message)
                throw new Error(data.message)
            }



        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };
    return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("All fields are required")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }
    return true;
}