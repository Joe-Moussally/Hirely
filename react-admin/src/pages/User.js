import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { localhost } from '../globalVariables';

const User = () => {

    let params = useParams()

    useEffect(() => {
        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/user/'+params.id,
        }).then(res => {
            console.log(res.data)
        })
    },[])

    return (
        <>
            <Navbar />
            <div>
                {params.id}
            </div>
        </>
    );
}
 
export default User;