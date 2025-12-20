import SearchBar from "../SearchBar/SearchBar";
import SideUsers from "../SideUsers/SideUsers";
import "./style.css";
import { useUser } from "../../context/UserProvider";
import { Usersinterface } from "../../types/chat";

const Side: React.FC = () => {
  const { users } = useUser();


  return (
    <aside>
      <SearchBar />
      <ul>
        {users
          ? Object.values(users).map((user:Usersinterface) => (
              <SideUsers key={user.id} user={user} />
            ))
          : []}
      </ul>
    </aside>
  );
};

export default Side;
