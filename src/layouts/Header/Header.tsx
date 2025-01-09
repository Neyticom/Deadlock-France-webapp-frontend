// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Logo from '/src/assets/icons/logo.png';
import DiscordIcon from '/src/assets/icons/discord.svg';
import XIcon from '/src/assets/icons/twitter-alt.svg';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const Header: React.FC = () => {
    const isMobile = useIsMobile();
    const [activePage, setActivePage] = useState(window.location.pathname);

    const changePage = () => {
        setTimeout(() => {
            setActivePage(window.location.pathname);
        });
    }

    return (
        <header className="header">
            {isMobile ? (
                /* --- Structure Mobile --- */
                <nav className="nav-mobile">
                    <ul className="nav-list">
                        {/* Logo mobile */}
                        <li>
                            <Link to="/" onClick={changePage} className="nav-link">
                                <div className="logo-container">
                                    <img src={Logo} alt="Logo Deadlock France" className="header-logo" />
                                    <span className="logo-title">Deadlock France</span>
                                </div>
                            </Link>
                        </li>

                        {/* Réseaux sociaux */}
                        <li className="social-medias">
                            <Link to="http://google.com" target="_blank" className="social-link">
                                <img src={DiscordIcon} alt="Discord DeadLock France" className="social-media" />
                            </Link>
                            <Link to="http://google.com" target="_blank" className="social-link">
                                <img src={XIcon} alt="X(Twitter) DeadLock France" className="social-media" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                /* --- Structure Desktop/Tablette --- */
                <nav className="nav-desktop">
                    <ul className="nav-list">
                        {/* Logo desktop/tablette */}
                        <li>
                            <Link to="/" onClick={changePage} className="nav-link">
                                <div className="logo-container">
                                    <img
                                        src={Logo}
                                        alt="Logo Deadlock France"
                                        className={activePage === '/' ? 'hidden header-logo' : 'header-logo'}
                                    />
                                    <span className="logo-title">Deadlock France</span>
                                </div>
                            </Link>
                        </li>

                        {/* Liens principaux */}
                        <li>
                            <Link to="/" onClick={changePage} className={activePage === '/' ? 'active nav-link' : 'nav-link'}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/patchnotes"
                                onClick={changePage}
                                className={activePage === '/patchnotes' ? 'active nav-link' : 'nav-link'}
                            >
                                Patchnotes
                            </Link>
                        </li>

                        {/* Réseaux sociaux */}
                        <li className="social-medias">
                            <Link to="http://google.com" target="_blank" className="social-link">
                                <img src={DiscordIcon} alt="Discord DeadLock France" className="social-media" />
                            </Link>
                            <Link to="http://google.com" target="_blank" className="social-link">
                                <img src={XIcon} alt="X(Twitter) DeadLock France" className="social-media" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;