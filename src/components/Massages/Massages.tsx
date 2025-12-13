import './style.css';

interface ChatMessage {
  username: string;
  clock: string;
  date: string;
  massage: string; // اگر در سرور واقعاً همین فیلد است؛ در غیر این صورت به message تغییر دهید
}

interface MassagesProps {
  messages: ChatMessage;
}

const Massages: React.FC<MassagesProps> = ({ messages }) => {
  const isYou = messages.username === 'Mehrdad';

  return (
    <li className={isYou ? 'me' : 'you'}>
      <div className="entete">
        <span className={`status ${isYou ? 'blue' : 'green'}`} />
        <h2>{messages.username}</h2>
        <h3>{`${messages.clock}, ${messages.date}`}</h3>
      </div>
      <div className="triangle" />
      <div className="message">{messages.massage}</div>
    </li>
  );
};

export default Massages;
