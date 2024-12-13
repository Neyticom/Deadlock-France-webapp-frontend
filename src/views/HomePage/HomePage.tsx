import React, { useState } from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import { patchnotes } from '../../assets/data';
import DonateButton from '../../components/DonateButton/DonateButton';
// import logo from '/src/assets/icons/logo.png';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
};

const HomePage: React.FC = () => {
    const [activePage, setActivePage] = useState(window.location.pathname);
    const isMobile = useIsMobile();

    const changePage = () => {
        setTimeout(() => {
            setActivePage(window.location.pathname);
        });
    }
    return (
        <div className="homepage-container">
            <Header />
            <main className="homepage-main">
            {isMobile ? (
            /* --- Structure Mobile --- */
                    <>
                        <div className="mobile-header">
                            <h1 className="main-title">Dernières mises à jour</h1>
                        </div>

                        <div className="news-container">
                            <div className="news-grid mobile-scrollable">
                                {patchnotes.slice(0, 3).map(note => (
                                    <Link
                                        to={`/patchnotes?id=${note.id}`}
                                        key={note.id}
                                        onClick={changePage}
                                        className="patchnote-card"
                                    >
                                        <figure className="patchnote-card">
                                            {note.image && (
                                                <img
                                                    src={note.image}
                                                    alt={note.title}
                                                    className="patchnote-image"
                                                />
                                            )}
                                        </figure>
                                        <figcaption className="patchnote-title">{note.title}</figcaption>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                to="/patchnotes"
                                onClick={changePage}
                                id="patchnotes-link"
                                className="mobile-link"
                            >
                                Voir toutes les mises à jour
                            </Link>
                        </div>

                        <div className="mobile-donate-container">
                            <DonateButton />
                        </div>
                    </>
                ) : (
                    /* --- Structure Desktop/Tablette --- */
                    <>
                        <h1 className="main-title">Dernières mises à jour</h1>
                        <div className="news-container">
                            <div className="news-grid">
                                {patchnotes.slice(0, 3).map(note => (
                                    <Link
                                        to={`/patchnotes?id=${note.id}`}
                                        key={note.id}
                                        onClick={changePage}
                                        className="patchnote-card"
                                    >
                                        <figure className="patchnote-card">
                                            {note.image && (
                                                <img
                                                    src={note.image}
                                                    alt={note.title}
                                                    className="patchnote-image"
                                                />
                                            )}
                                        </figure>
                                        <figcaption className="patchnote-title">{note.title}</figcaption>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                to="/patchnotes"
                                onClick={changePage}
                                id="patchnotes-link"
                                className={activePage === '/patchnotes' ? 'active nav-link' : 'nav-link'}
                            >
                                Consulter la liste des patchnotes
                            </Link>
                        </div>
                    </>
                )}
                {/* <Link to="/" onClick={changePage}></Link> */}
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;