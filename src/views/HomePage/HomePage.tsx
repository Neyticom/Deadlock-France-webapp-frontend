import React from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import './HomePage.scss';
import logo from '/src/assets/icons/logo.png';

const HomePage: React.FC = () => {
    return (
        <div className="homepage-container">
            <Header />
            <main className="homepage-main">
                <img src={logo} alt="Logo Deadlock France" className="logo" />
                <h1 className="main-title">
                    <span className='main-title_top'>Rejoins vite la communauté</span>
                    <span className='main-title_bottom'>Deadlock France</span>
                </h1>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;