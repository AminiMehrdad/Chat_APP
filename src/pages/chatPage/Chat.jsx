import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import NewMessage from '../../components/NewMessage/NewMessage';
import styles from '../../styles/ChatApp.module.css';
import Conversation from '../../components/conversation/Conversation';

function Chat() {
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleComposeClick = () => {
    setShowNewMessage(true);
  };

  const handleBackClick = () => {
    setShowNewMessage(false);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <div className={styles.sidePanel}>
          <div className={styles.sideOne}>
            <Sidebar 
              onComposeClick={handleComposeClick}
              onContactSelect={handleContactSelect}
            />
          </div>
          <div className={`${styles.sideTwo} ${showNewMessage ? styles.sideTwo_active : ''}`}>
            <NewMessage onBackClick={handleBackClick} />
          </div>
        </div>
        
        <div className={styles.conversationPanel}>
          <Conversation contact={selectedContact} />
        </div>
      </div>
    </div>
  );
}

export default Chat;