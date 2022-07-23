import { useEffect,useState } from "react";
import axios from 'axios'
import { localhost } from '../globalVariables'
import Navbar from "../components/dashboard-components/Navbar";
const Dashboard = () => {

    const [stats,setStats] = useState();

    useEffect(() => {
        
        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/stats'
        }).then(res => {
            setStats(res.data)
        })
        .catch(err => console.log(err))

    },[])
    
    return (
        <>
            <Navbar />
            <div className="section-container">
                <h1 className="page-title">Dashboard</h1>

                <div id="stats-container">
                    
                    <div className="stat-container">
                        <p>Total users</p>
                        <span>{stats.user_count}</span>
                    </div>

                    <div className="stat-container">
                        <p>Total job offers</p>
                        <span>{stats.offer_count}</span>
                    </div>

                    <div className="stat-container">
                        <p>Total logins</p>
                        <span>{stats.login_count}</span>
                    </div>

                    <div className="stat-container">
                        <p>Total signups</p>
                        <span>{stats.signup_count}</span>
                    </div>

                </div>

            </div>
        </>
    );
}
 
export default Dashboard;