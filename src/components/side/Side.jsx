import SearchBar from "../SearchBar/SearchBar";
import SideUsers from "../SideUsers/SideUsers";
import "./style.css";
import { useEffect, useState } from 'react';
const Side = () => {

    const [users, setUsers]= useState([])
    useEffect(() => {
        fetch("/mock-data/data.json")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            });
    }, []);
    
    return (
        <aside>
            <SearchBar />
            <ul>
                {
                    users.map((user) => <SideUsers key={user.username} user={user}/>)
                }
            </ul>
        </aside>
    );
}

export default Side;
