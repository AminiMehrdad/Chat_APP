import React from 'react';
import styles from '../../styles/Sidebar.module.css';

const ContactItem = ({ contact, onClick }) => {
  return (
    <div 
      className={styles.sidebarBody}
      onClick={() => onClick(contact)}
    >
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarAvatar}>
          <img 
            src={contact.avatar} 
            alt={contact.name}
            className={styles.avatarIcon}
          />
        </div>
        
        <div className={styles.sidebarMain}>
          <div className={styles.sidebarName}>
            <span className={styles.nameMeta}>{contact.name}</span>
          </div>
        </div>
        
        <div className={styles.sidebarTime}>
          <span className={styles.timeMeta}>{contact.time}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
