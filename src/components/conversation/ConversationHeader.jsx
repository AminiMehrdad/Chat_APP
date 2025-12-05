import React from 'react';
import styles from '../../styles/Conversation.module.css';

const ConversationHeader = ({ contact }) => {
  return (
    <div className={styles.conversationHeading}>
      <div className={styles.headingContent}>
        <div className={styles.headingAvatar}>
          <img 
            src={contact?.avatar || "https://bootdey.com/img/Content/avatar/avatar6.png"}
            alt={contact?.name || "User"}
            className={styles.avatarImage}
          />
        </div>
        
        <div className={styles.headingName}>
          <span className={styles.headingNameMeta}>
            {contact?.name || "John Doe"}
          </span>
          <span className={styles.headingOnline}>Online</span>
        </div>
        
        <div className={styles.headingActions}>
          <button 
            className={styles.headingCompose}
            aria-label="Search"
          >
            <i className="fa fa-search fa-2x" aria-hidden="true"></i>
          </button>
          
          <button 
            className={styles.headingDot}
            aria-label="More options"
          >
            <i className="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
