import React from 'react';
import styles from '../../styles/Conversation.module.css';

const Message = ({ message }) => {
  const isReceiver = message.sender === 'receiver';
  
  return (
    <div className={isReceiver ? styles.messageMainReceiver : styles.messageMainSender}>
      <div className={isReceiver ? styles.receiver : styles.sender}>
        <div className={styles.messageText}>
          {message.text}
        </div>
        <div className={styles.messageTime}>
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default Message;
