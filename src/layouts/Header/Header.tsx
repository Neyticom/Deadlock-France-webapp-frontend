import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Logo from '/src/assets/icons/logo.png';
import DiscordIcon from '/src/assets/icons/discord.svg';
import XIcon from '/src/assets/icons/twitter-alt.svg';

const Header: React.FC = () => {

    const [activePage, setActivePage] = useState(window.location.pathname);

    const changePage = () => {
        setTimeout(() => {
            setActivePage(window.location.pathname);
        });
    }

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li>
                        <Link to="/" onClick={changePage} className='nav-link'><img src={Logo} alt="Logo Deadlock France" className={activePage === '/' ? 'hidden header-logo' : 'header-logo'} /></Link>
                    </li>
                    <li>
                        <Link to="/" onClick={changePage} className={activePage === '/' ? 'active nav-link' : 'nav-link'}>Accueil</Link>
                    </li>
                    <li>
                        <Link to="/patchnotes" onClick={changePage} className={activePage === '/patchnotes' ? 'active nav-link' : 'nav-link'}>Patchnotes</Link>
                    </li>
                    <li className='social-medias'>
                        <Link to="http://google.com" target="_blank" className='social-link'><img src={DiscordIcon} alt="Discord DeadLock France" className="social-media" /></Link>
                        <Link to="http://google.com" target="_blank" className='social-link'><img src={XIcon} alt="X(Twitter) DeadLock France" className="social-media" /></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;