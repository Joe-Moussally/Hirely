import { useEffect } from 'react'
import axios from 'axios'
import { localhost } from '../globalVariables';

const Login = () => {

    useEffect(()=>{
        document.getElementById('login-btn').addEventListener('click',handleLogin)
    },[])

    const handleLogin = () => {
        const data = new FormData()
        //function to handle signup
        data.append('email',document.getElementById('email').value)
        data.append('password',document.getElementById('password').value)
        axios({
            method:'POST',
            url:'http://'+localhost+':8000/api/login',
            data:data
        }).then(res => {
            console.log(res.data)
        })
    }

    return (
        <>
            <div className="login-container">

                <div className="hero-container">
                    <h1 id='hero-text'>We Are The Bridge Between Talent And Organizations</h1>
                </div>

                <div className="form-container">
                    <img id='hero-logo' src={require('../assets/white-brand.png')}/>
                    <h1 id='form-title'>Admin Panel</h1>
                    <input type='email' placeholder="Email" className='login-input' id='email'/>
                    <input type='password' placeholder="Password" className='login-input' id='password'/>
                    <button className="outline-button" id='login-btn'>Log In</button>
                </div>

            </div>
        </>
    );
}

export default Login