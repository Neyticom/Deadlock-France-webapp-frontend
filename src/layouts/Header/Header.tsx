import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Logo from '/src/assets/icons/logo.png';
import DiscordIcon from '/src/assets/icons/discord.svg';
import XIcon from '/src/assets/icons/twitter-alt.svg';

const Header = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const handleResize  = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        handleResize(mediaQuery);
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const [activePage, setActivePage] = useState(window.location.pathname.split('/')[1]);

    const changePage = () => {
        setTimeout(() => {
            setActivePage(window.location.pathname.split('/')[1]);
        });
    }

    return (
        <header className="header">
            {!isMobile && (
                <>
                    <Link to="/" onClick={changePage} className='logo-link'><img src={Logo} alt="Logo Deadlock France" className='logo' /><h1 className='logo-title'>Deadlock<br/>France</h1></Link>
                    <nav className="nav-list">
                        <Link to="/" onClick={changePage} className={activePage === '' ? 'active nav-link' : 'nav-link'}>Accueil</Link>
                        <Link to="/patchnotes" onClick={changePage} className={activePage === 'patchnotes' ? 'active nav-link' : 'nav-link'}>Patchnotes</Link>
                    </nav>
                </>
            )}
            <nav className="social-nav">
                <Link to="http://google.com" target="_blank" className='social-link'><img src={DiscordIcon} alt="Discord DeadLock France" className="social-icon" /></Link>
                <Link to="http://google.com" target="_blank" className='social-link'><img src={XIcon} alt="X(Twitter) DeadLock France" className="social-icon" /></Link>
            </nav>
        </header>
    );
};

export default Header;