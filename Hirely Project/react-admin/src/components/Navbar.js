import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const nav = useNavigate()

    const showMenu = () => {
        document.getElementById('dropdown-menu').classList.toggle('menu-hidden')
    }

    const hideMenu = () => {
        document.getElementById('dropdown-menu').classList.toggle('menu-hidden')
    }

    return (
        <div id="nav-container">
            <img src={require('../assets/white-brand.png')} id="nav-logo"/>

            <ul id='nav-ul'>

                <li onClick={() => {
                    nav('/dashboard')
                }}>Dashboard</li>
                
                <li onClick={() => {
                    nav('/users')
                }}>Users</li>

                <li onClick={() => {
                    nav('/offers')
                }}>Offers</li>

                <li id='more' onMouseEnter={showMenu} onMouseLeave={hideMenu}>
                    ...
                    <div
                    id='dropdown-menu'
                    className='menu-hidden'
                    onClick={() => {
                        localStorage.removeItem('token')
                        nav('/login')
                    }}
                    >
                        Logout
                    </div>
                </li>

            </ul>
        </div>
    );
}
 
export default Navbar;