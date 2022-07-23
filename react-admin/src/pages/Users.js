import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/dashboard-components/Navbar";
import { localhost } from "../globalVariables";

const Users = () => {

    const [stats,setStats] = useState('')
    const [users,setUsers] = useState([])

    useEffect(() => {        
        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/stats'
        }).then(res => {
            console.log(res.data)
            setStats(res.data)
        })
        .catch(err => console.log(err))

    },[])

    //function to handle search
    const handleSearch = (e) => {
        console.log(e.target.value)
    }

    return (
        <>
            <Navbar />
            <div className="section-container">
                <h1 className="page-title">Users</h1>

                <h2 className="secondary-title">Total Users <span className="number">{stats.user_count}</span></h2>

                <div id="stats-container">
                    <input type='text' className="search-input" placeholder="Search a user" onChange={handleSearch}/>
                </div>

            </div>
        </>
    );
}
 
export default Users;