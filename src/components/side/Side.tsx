import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SideUsers from '../SideUsers/SideUsers';
import { ChatUser } from '../../types/chat';
import './style.css';
import { client } from '../../api/client';

const Side: React.FC = () => {
  const [users, setUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await client.get("/users/all");
        setUsers(data.data);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchUsers();
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
