import './style.css';
import {ChatUser} from "../../types/chat"

interface SideUsersProps {
  user: ChatUser;
}

const SideUsers: React.FC<SideUsersProps> = ({ user }) => {
  return (
    <li>
      <img src={user.image} alt={`${user.username}'s`} />
      <div>
        <h2>{user.username}</h2>
        <h3>
          <span className={`status ${user.status === 'online' ? 'green' : 'orange'}`} />
          {user.status}
        </h3>
      </div>
    </li>
  );
};

export default SideUsers;
