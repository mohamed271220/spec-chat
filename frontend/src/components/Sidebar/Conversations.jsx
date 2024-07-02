import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojs';
import Conversation from './Conversation'

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);
  return (
    <div className='flex py-2 flex-col overflow-auto'>
      {conversations.map((conversation, index) => (
        <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIdx={index === conversations.length - 1} />
      ))}
      {loading && <span className='loading loading-spinner'></span>}
    </div>
  )
}

export default Conversations