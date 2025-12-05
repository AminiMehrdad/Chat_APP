import React from 'react';
import styles from '../../styles/NewMessage.module.css';

const NewMessageHeader = ({ onBackClick }) => {
  return (
    <div className={styles.newMessageHeading}>
      <div className={styles.newMessageMain}>
        <button 
          className={styles.newMessageBack}
          onClick={onBackClick}
          aria-label="Back"
        >
          <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        </button>
        <div className={styles.newMessageTitle}>
          New Chat
        </div>
      </div>
    </div>
  );
};

export default NewMessageHeader;
