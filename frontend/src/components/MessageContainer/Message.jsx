

const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="chat-bubble text-white bg-blue-500">
                Hi there! How can I help you today?
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:50 AM</div>
        </div>
    )
}

export default Message