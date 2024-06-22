import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { authUser, setAuthUser } = useAuth();
    const logout = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem("chat-user")
                setAuthUser(null)
                window.location.reload()
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout