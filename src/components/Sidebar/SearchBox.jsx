import React, { useState } from 'react';
import styles from '../../styles/Sidebar.module.css';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.searchBoxInner}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search or start new chat"
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchBox;
