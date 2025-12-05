import React from 'react';
import Message from './Message';
import styles from '../../styles/Conversation.module.css';

const MessageList = ({ messages }) => {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messagePrevious}>
        <div className={styles.previous}>
          <a href="#!">Show Previous Message!</a>
        </div>
      </div>
      
      <div className={styles.messageBody}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
