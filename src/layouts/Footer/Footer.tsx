import React from 'react';
import { Link } from 'react-router-dom';
import DonateButton from '../../components/DonateButton/DonateButton';
import './Footer.scss';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 576);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

export default function Footer () {
    const isMobile = useIsMobile();

    return (
        <footer className="footer">
            {isMobile ? (
                /* --- Structure Mobile --- */
                <nav className="nav-mobile-footer">
                    <ul className="nav-list-mobile">
                        {/* Accueil */}
                        <li>
                            <Link to="/" className="nav-link-mobile">
                                <span className="nav-icon">🏠</span>
                                <span className="nav-label">Accueil</span>
                            </Link>
                        </li>

                        {/* Patchnotes */}
                        <li>
                            <Link to="/patchnotes" className="nav-link-mobile">
                                <span className="nav-icon">📝</span>
                                <span className="nav-label">Patchnotes</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                /* --- Structure Desktop/Tablette --- */
                <div className="footer-desktop">
                    <DonateButton />
                </div>
            )}
        </footer>
    );
};