import { useUser } from '../../context/UserProvider';
import './style.css';

interface ChatMessage {
  text:string;
  senderId: number;
  conversationId: number
}

interface MassagesProps {
  messages: ChatMessage;
}

const Massages: React.FC<MassagesProps> = ({ messages }) => {
  const {user} = useUser()
  const isYou = messages.senderId === user.id;

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
