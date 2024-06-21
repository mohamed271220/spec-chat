import MessageInput from './MessageInput'
import Messages from './Messages'
import NoChatSelected from './NoSelectedChat';

const MessageContainer = () => {
    const noChatSelected = true;
    return (
        <div className='md:min-2-[450px] flex flex-col'>
            {noChatSelected ? <NoChatSelected /> :

                <>
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>
                            To:
                        </span>
                        <span className='text-gray-900 font-bold'>
                            Mohamed
                        </span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>

            }
        </div>
    )
}

export default MessageContainer