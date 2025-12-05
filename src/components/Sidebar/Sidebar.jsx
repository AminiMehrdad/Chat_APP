import React from 'react';
import SidebarHeader from './SidebarHeader';
import SearchBox from './SearchBox';
import ContactList from './ContactList';
import styles from '../../styles/Sidebar.module.css';

const Sidebar = ({ onComposeClick, onContactSelect }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.sidebar}>
      <SidebarHeader onComposeClick={onComposeClick} />
      <SearchBox onSearch={handleSearch} />
      <ContactList 
        searchQuery={searchQuery} 
        onContactSelect={onContactSelect}
      />
    </div>
  );
};

export default Sidebar;
