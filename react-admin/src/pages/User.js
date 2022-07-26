import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { localhost } from '../globalVariables';
import SkillCard from "../components/users/SkillCard";

const User = () => {

    let params = useParams()
    let nav = useNavigate()

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

    const handleRemove = () => {
        let id = params.id;

        axios({
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
            method:'POST',
            data:{id:id},
            url:'http://'+localhost+':8000/api/admin/remove_user/',
        }).then(res => {
            console.log(res.data)
            nav('/users')
        })
    }

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
                    <h1 id="profile-name">{user.name}</h1>
                </div>

                {
                    user.about?
                    <div>
                        <h2 className="secondary-title">About</h2>
                        <p className="about">{user.about}</p>
                    </div>:<></>
                }

                {
                    skills?
                    <div style={{marginTop:50}}>
                        <h2 className="secondary-title">Skills</h2>
                        <div id="skills-container">
                            {
                                skills.map(skill => (
                                    <SkillCard skill={skill.skill}/>
                                ))
                            }
                        </div>
                    </div>:<></>
                }

                <div id="remove-btn-container" onClick={handleRemove}>
                    <button>Remove User</button>
                </div>

            </div>
        </>
        :
        <></>
    );
}
 
export default User;