import './style.css';
// import {ChatUser} from "../../types/chat"
import { useUser } from '../../context/UserProvider';

interface SideUsersProps {
  user: {
    username:string,
    id:number,
    image: string,
    status: string,
  };
}
// export interface ChatUser {
//   username: string;
//   status: 'online' | 'offline' | 'away'; // یا string اگر نمی‌دانید دقیقاً چه مقدارهایی می‌آید
//   image: string;
//   avatar?: string;    // اگر در JSON دو فیلد مشابه دارید یکی را حذف یا هماهنگ کنید
//   lastSeen?: string;
// }

const SideUsers: React.FC<SideUsersProps> = ({ user }) => {
  const {resiver, setResiver} = useUser()
  return (
    <li className={resiver.id === user.id ? "selected": ""}
    onClick={() => {
      setResiver({
        id: user.id,
        username: user.username
      })
    }}>
      <img src={user.image} alt={`${user.username}'s`} />
      <div>
        <h2 className={resiver.id === user.id ? "selectedtext": ""}>{user.username}</h2>
        <h3 className={resiver.id === user.id ? "selectedtext": ""}>
          <span className={`status ${user.status === 'online' ? 'green' : 'orange'}`} />
          {user.status}
        </h3>
      </div>
    </li>
  );
};

export default SideUsers;
