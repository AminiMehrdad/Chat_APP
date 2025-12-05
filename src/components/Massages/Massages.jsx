import "./style.css"

const Massages = ({messages}) => {    
    const isYou = messages.username === "Mehrdad"? true: false
    return (
        <li className={isYou?"me":"you"}>
                    <div className="entete">
                        <span className={`status ${isYou?"blue":"green"}`}></span>
                        <h2>{messages.username}</h2>
                        <h3>{`${messages.clock}, ${messages.date}`}</h3>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">
                        {messages.massage}
                    </div>
        </li>
    );
}
export default Massages;
