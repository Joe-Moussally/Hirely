import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { localhost } from '../globalVariables';

const User = () => {

    let params = useParams()

    const [user,setUser] = useState('')
    const [skills,setSkills] = useState([])

    useEffect(() => {
        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'GET',
            url:'http://'+localhost+':8000/api/admin/user/'+params.id,
        }).then(res => {
            console.log(res.data)
            setUser(res.data.user)
            setSkills(res.data.skills)
        })
    },[])

    return (
        user?
        <>
            <Navbar />
            <div className="section-container">

                <div id="profile-header">
                    <img src={user.picture_base64?
                    'data:image/jpeg;base64,'+user.picture_base64:
                    require('../assets/default_picture.jpg')
                    }
                    className='profile-header-picture'/>
                    <h1 className="page-title">{user.name}</h1>
                </div>

                <div>
                    <h2 className="secondary-title">About</h2>
                    <p className="about">{user.about}</p>
                </div>

            </div>
        </>
        :
        <></>
    );
}
 
export default User;