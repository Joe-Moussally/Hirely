const Navbar = () => {
    return (
        <div id="nav-container">
            <img src={require('../../assets/white-brand.png')} id="nav-logo"/>

            <ul id='nav-ul'>
                <li onClick={() => {console.log('PRESSED')}}>Statistics</li>
                <li onClick={() => {console.log('PRESSED')}}>Users</li>
                <li onClick={() => {console.log('PRESSED')}}>Offers</li>
            </ul>
        </div>
    );
}
 
export default Navbar;