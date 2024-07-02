import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(true)
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
                const data = await res.json()
                if (res.ok) {
                    setMessages(data)
                }
            } catch (error) {
                toast.error('Failed to fetch messages')
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()
    }, [selectedConversation._id, setMessages])
    return { loading, messages }
}


export default useGetMessages
