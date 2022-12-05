import './appHeader.scss';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const activeLink = ({ isActive }) => isActive ? {color: 'red'} : undefined
  
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink to="/" style={activeLink}>Characters</NavLink></li>
                    /
                    <li><NavLink to="/comics" style={activeLink}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;