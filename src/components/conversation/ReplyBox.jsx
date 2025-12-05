import React, { useState } from 'react';
import styles from '../../styles/Conversation.module.css';

const ReplyBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.reply}>
      <div className={styles.replyContent}>
        <button 
          className={styles.replyEmojis}
          aria-label="Emoji"
        >
          <i className="fa fa-smile-o fa-2x" aria-hidden="true"></i>
        </button>
        
        <div className={styles.replyMain}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className={styles.replyTextarea}
            rows={1}
          />
        </div>
        
        <button 
          className={styles.replyRecording}
          aria-label="Attach"
        >
          <i className="fa fa-paperclip fa-2x" aria-hidden="true"></i>
        </button>
        
        <button 
          className={styles.replySend}
          onClick={handleSubmit}
          aria-label="Send"
        >
          <i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default ReplyBox;
