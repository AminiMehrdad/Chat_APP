import React, { useState } from 'react';
import styles from '../../styles/NewMessage.module.css';

const ComposeBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.composeBox}>
      <div className={styles.composeBoxInner}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search contacts"
          className={styles.composeInput}
        />
      </div>
    </div>
  );
};

export default ComposeBox;
