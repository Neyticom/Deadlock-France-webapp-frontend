import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import HomeIcon from '../../assets/icons/home.svg';
import PatchnoteIcon from '../../assets/icons/patchnotes.svg';

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
                <nav className="footer__nav-list">
                    <Link to="/" className={page === '' ? 'footer__nav-link--active' : 'footer__nav-link'}>
                        <img src={HomeIcon} alt="" className={page === '' ? 'footer__nav-icon--active' : 'footer__nav-icon'} />
                        <p className={page === '' ? 'footer__nav-text--active' : 'footer__nav-text'}>Accueil</p>
                    </Link>
                    <Link to="/patchnotes" className={page === 'patchnotes' ? 'footer__nav-link--active' : 'footer__nav-link'}>
                        <img src={PatchnoteIcon} alt="" className={page === 'patchnotes' ? 'footer__nav-icon--active' : 'footer__nav-icon'} />
                        <p className={page === 'patchnotes' ? 'footer__nav-text--active' : 'footer__nav-text'}>Patchnotes</p>
                    </Link>
                 </nav>
            )}
        </footer>
    );
};

export default Footer;