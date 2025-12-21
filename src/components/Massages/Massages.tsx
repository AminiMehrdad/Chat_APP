import { useUser } from "../../context/UserProvider";
import "./style.css";

interface ChatMessage {
  message: string;
  senderId: number;
  conversationId: number;
  username: string;
  clock: string;
  date: string;
}

interface MassagesProps {
  messages: ChatMessage;
}

const Massages: React.FC<MassagesProps> = ({ messages }) => {
  const { user } = useUser();
  const isYou = messages.senderId === user.id;

  return (
    <li className={isYou ? 'me' : 'you'}>
      <div className="entete">
        <span className={`status ${isYou ? 'blue' : 'green'}`} />
        <h2>{messages.username}</h2>
        <h3>{`${messages.clock}, ${messages.date}`}</h3>
      </div>
      <div className="triangle" />
      <div className="message">{messages.message}</div>
    </li>
  );
};

export default Massages;
