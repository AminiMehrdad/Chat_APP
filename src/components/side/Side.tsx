import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SideUsers from '../SideUsers/SideUsers';
import { ChatUser } from '../../types/chat';
import './style.css';

const Side: React.FC = () => {
  const [users, setUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    fetch('/mock-data/data.json')
      .then((res) => res.json())
      .then((data: ChatUser[]) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
      });
  }, []);

  return (
    <aside>
      <SearchBar />
      <ul>
        {users.map((user) => (
          <SideUsers key={user.username} user={user} />
        ))}
      </ul>
    </aside>
  );
};

export default Side;
