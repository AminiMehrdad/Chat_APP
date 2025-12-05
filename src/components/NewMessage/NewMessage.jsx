import React from 'react';
import NewMessageHeader from './NewMessageHeader';
import ComposeBox from './ComposeBox';
import ContactList from '../Sidebar/ContactList';
import styles from '../../styles/NewMessage.module.css';

const NewMessage = ({ onBackClick }) => {
  const handleContactSelect = (contact) => {
    console.log('Selected contact:', contact);
    onBackClick();
  };

  return (
    <div className={styles.newMessage}>
      <NewMessageHeader onBackClick={onBackClick} />
      <ComposeBox />
      <div className={styles.composeSidebar}>
        <ContactList 
          searchQuery=""
          onContactSelect={handleContactSelect}
        />
      </div>
    </div>
  );
};

export default NewMessage;
