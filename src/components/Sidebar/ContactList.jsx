import React from 'react';
import ContactItem from './ContactItem';
import styles from '../../styles/Sidebar.module.css';

const ContactList = ({ searchQuery, onContactSelect }) => {
  const contacts = [
    { id: 1, name: 'John Doe', avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png', time: '18:18' },
    { id: 2, name: 'Jane Smith', avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png', time: '18:18' },
    { id: 3, name: 'Bob Johnson', avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png', time: '18:18' },
    { id: 4, name: 'Alice Brown', avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png', time: '18:18' },
    { id: 5, name: 'Charlie Davis', avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png', time: '18:18' },
    { id: 6, name: 'Eve Wilson', avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png', time: '18:18' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.contactList}>
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={onContactSelect}
        />
      ))}
    </div>
  );
};

export default ContactList;
