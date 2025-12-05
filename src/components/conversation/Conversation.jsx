import React from 'react';
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import ReplyBox from './ReplyBox';
import styles from '../../styles/Conversation.module.css';

const Conversation = ({ contact }) => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: 'Hi, what are you doing?!', sender: 'receiver', time: 'Sun' },
    { id: 2, text: 'I am doing nothing man!', sender: 'sender', time: 'Sun' },
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'sender',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className={styles.conversation}>
      <ConversationHeader contact={contact} />
      <MessageList messages={messages} />
      <ReplyBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Conversation;
