import logo from '../../assets/logo.png'
import CartWidget from '../CartWidget';
import Pill from '../pill';

const Navbar = () => {
    return(
<header className="header">
    <nav className="navbar container">
        <figure className="navbar__logo">
            <img src={logo} alt="Logo Potis Restó"/>
        </figure>
        <menu className="navbar__menu">
            <li className="navbar__item">
                <a href="" className="navbar__link">Menú</a>
            </li>
            <li className="navbar__item">
                <a href="" className="navbar__link">Sucursales</a>
            </li>
            <li className="navbar__item">
                <a href="" className="navbar__link">Contacto</a>
            </li>
            <li>
                <a href="" className="navbar__link"><CartWidget/></a>
            </li>
        </menu>
    </nav>
</header>
    );
}

export default Navbar;