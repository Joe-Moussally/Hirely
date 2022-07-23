import { useEffect } from "react";
import axios from 'axios'
import { localhost } from '../globalVariables'
import Navbar from "../components/dashboard-components/Navbar";
const Dashboard = () => {

    useEffect(() => {
        
        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/stats'
        }).then(res => {console.log(res.data)})
        .catch(err => console.log(err))

    },[])
    
    return (
        <>
            <Navbar />
            <div id="dashboard-container">
                <h1>Dashboard</h1>
            </div>
        </>
    );
}
 
export default Dashboard;