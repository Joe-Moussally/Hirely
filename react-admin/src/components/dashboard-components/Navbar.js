import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const nav = useNavigate()


    return (
        <div id="nav-container">
            <img src={require('../../assets/white-brand.png')} id="nav-logo"/>

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

            </ul>
        </div>
    );
}
 
export default Navbar;