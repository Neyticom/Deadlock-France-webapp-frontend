import React, { useState } from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import { Link } from 'react-router-dom';
import './HomePage.scss';
// import logo from '/src/assets/icons/logo.png';

const HomePage: React.FC = () => {
    const [activePage, setActivePage] = useState(window.location.pathname);

    const changePage = () => {
        setTimeout(() => {
            setActivePage(window.location.pathname);
        });
    }
    return (
        <div className="homepage-container">
            <Header />
            <main className="homepage-main">
                {/* <img src={logo} alt="Logo Deadlock France" className="logo" /> */}
                <h1 className="main-title">
                    <span>Dernières mises à jour</span>  
                </h1>

                <div className='news-container'>
                    <Link to="/patchnotes" onClick={changePage} className={activePage === '/patchnotes' ? 'active nav-link' : 'nav-link'} id="patchnotes-link">Consulter la liste des patchnotes</Link>
                </div>
                {/* <Link to="/" onClick={changePage}></Link> */}
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;