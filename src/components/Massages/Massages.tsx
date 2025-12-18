import { useUser } from '../../context/UserProvider';
import './style.css';

interface ChatMessage {
  text:string;
  sender: string;
  user: {
    username: string;
    clock: string;
    date: string;
    massage: string; // اگر در سرور واقعاً همین فیلد است؛ در غیر این صورت به message تغییر دهید
  }
}

interface MassagesProps {
  messages: ChatMessage;
}

const Massages: React.FC<MassagesProps> = ({ messages }) => {
  const {user} = useUser()
  const isYou = messages.sender === user.username;

  return (
    <li className={isYou ? 'me' : 'you'}>
      <div className="entete">
        <span className={`status ${isYou ? 'blue' : 'green'}`} />
        <h2>{messages.user.username}</h2>
        <h3>{`${messages.user.clock}, ${messages.user.date}`}</h3>
      </div>
      <div className="triangle" />
      <div className="message">{messages.text}</div>
    </li>
  );
};

export default Massages;
