import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {

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

    const page = window.location.pathname.split('/')[1];

    return (
        <footer className="footer">
            {isMobile && (
                <nav className="nav-list">
                    <Link to="/" className={page === '' ? 'active nav-link' : 'nav-link'}>Accueil</Link>
                    <Link to="/patchnotes" className={page === 'patchnotes' ? 'active nav-link' : 'nav-link'}>Patchnotes</Link>
                 </nav>
            )}
        </footer>
    );
};

{/* <nav className="nav-mobile-footer">
    <ul className="nav-list-mobile">
        <li>
            <Link to="/" className="nav-link-mobile">
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Accueil</span>
            </Link>
        </li>
        <li>
            <Link to="/patchnotes" className="nav-link-mobile">
                <span className="nav-icon">📝</span>
                <span className="nav-label">Patchnotes</span>
            </Link>
        </li>
    </ul>
</nav> */}

export default Footer;