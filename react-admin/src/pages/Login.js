const Login = () => {
    return (
        <>
            <div className="login-container">

                <div className="hero-container">
                    <img id='hero-logo' src={require('../assets/white-brand.png')}/>
                    <h1 id='hero-text'>We Are The Bridge Between Talent And Organizations</h1>
                </div>

                <div className="form-container">
                    <h1>Admin Panel</h1>
                    <input type='email' placeholder="Email" className='login-input'/>
                    <input type='password' placeholder="Password" className='login-input'/>
                    <button className="">Log In</button>
                </div>

            </div>
        </>
    );
}

export default Login