import Conversation from './Conversation'

const Conversations = () => {
  return (
    <div className='flex py-2 flex-col overflow-auto'>
        <Conversation />
        <Conversation />
        <Conversation />
    </div>
  )
}

export default Conversations