import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import DonateButton from '../../components/DonateButton/DonateButton';
import Logo from '/src/assets/icons/logo.png';
import { getPatchnotes } from "../../api/patchnoteApi";

interface Patchnote {
    id: number;
    title: string;
    content: string;
    author: string;
    version: string;
    state: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    date: string;
    createdAt: string;
    updatedAt: string;
}
  
const HomePage = () => {

    const [patchnotes, setPatchnotes] = useState<Patchnote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatchnotes = async () => {
            try {
            const data = await getPatchnotes();
            setPatchnotes(data);
            } catch (error) {
            console.log(error);
            setError("Erreur lors du chargement des patchnotes");
            } finally {
            setLoading(false);
            }
        };

        fetchPatchnotes();
    }, []);

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => { // isMobile

        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const handleResize  = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        handleResize(mediaQuery);
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    useEffect(() => { // Patchnotes scroll & swipe

        // Scroll

        const patchnotesList = document.querySelector('.home-main__patchnote-list') as HTMLElement;

        if (!patchnotesList) return;
        const patchnoteCards = Array.from(document.querySelectorAll('.home-main__patchnote-card')) as HTMLLinkElement[];
        const currentIndex = 1;
        let isScrolling = false;

        function startTransition(direction: string) { // Patchnotes scroll transition (left or right)

            const width = patchnoteCards[0].offsetWidth + 30;
        
            patchnoteCards.forEach((patchnote, index) => {
                const position = index - currentIndex;
            
                switch (position) {
                    case -1:
                        if (direction === "right") {
                            patchnote.style.zIndex = "1";
                            patchnote.style.opacity = "0.7";
                            patchnote.style.transform = `scale(0.9) translateX(${width*2.2}px)`;
                        }else if (direction === "left"){
                            patchnote.style.zIndex = "2";
                            patchnote.style.opacity = "1";
                            patchnote.style.transform = `scale(1) translateX(${width}px)`;
                        }
                    break;
                    case 0:
                        if (direction === "right") {
                            patchnote.style.zIndex = "2";
                            patchnote.style.opacity = "0.7";
                            patchnote.style.transform = `scale(0.9) translateX(${-width*1.1}px)`;
                        }else if (direction === "left"){
                            patchnote.style.zIndex = "2";
                            patchnote.style.opacity = "0.7";
                            patchnote.style.transform = `scale(0.9) translateX(${width*1.1}px)`;
                        }
                    break;
                    case 1:
                        if (direction === "right") {
                            patchnote.style.zIndex = "2";
                            patchnote.style.opacity = "1";
                            patchnote.style.transform = `scale(1) translateX(${-width}px)`;
                        }else if (direction === "left"){
                            patchnote.style.zIndex = "1";
                            patchnote.style.opacity = "0.7";
                            patchnote.style.transform = `scale(0.9) translateX(${-width*2.2}px)`;
                        }
                    break;
                    default:
                    break;
                }
            });
        }

        function movePatchnotes(direction: string) { // Change patchnote order into DOM
            
            if (direction === 'right') {
                const first = patchnoteCards.shift() as HTMLLinkElement;
                patchnoteCards.push(first);
            } else if (direction === 'left') {
                const last = patchnoteCards.pop() as HTMLLinkElement;
                patchnoteCards.unshift(last);
            }

            patchnotesList.innerHTML = '';
            patchnoteCards.forEach((patchnote, index) => {
                patchnote.style.opacity = ``;
                patchnote.style.transform = ``;
                patchnote.classList.toggle('selected', index === currentIndex);
                patchnotesList.appendChild(patchnote);
            });
        }

        function scrollPatchnotes(direction: string) { // Animation management function
            
            if (isScrolling) return;
            isScrolling = true;

            startTransition(direction);
            setTimeout(() => {
                movePatchnotes(direction);
                isScrolling = false;
            }, 400);
        }

        const handleScroll = (event: WheelEvent) => {  // Inspect scroll event to start scrolling patchnotes left or right
            event.preventDefault();
            scrollPatchnotes(event.deltaY > 0 ? "right" : "left");
        }

        // Swipe

        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (event: TouchEvent) => (touchStartX = event.touches[0].clientX); // Handle user touch start x position

        const handleTouchMove = (event: TouchEvent) => (touchEndX = event.touches[0].clientX); // Handle user touch move x position

        const handleTouchEnd = () => { // Handle user touch end x position
            if (touchStartX === null || touchEndX === null) return;

            const differenceX = touchStartX - touchEndX;
            if (Math.abs(differenceX) > 40) scrollPatchnotes(differenceX > 0 ? "right" : "left");

            touchStartX = touchEndX = 0;
        };

        // Event listeners

        function addEventListeners() {
            // Add scroll event listener
            patchnotesList.addEventListener('wheel', handleScroll);
            // Add swipe events listeners
            patchnotesList.addEventListener('touchstart', handleTouchStart);
            patchnotesList.addEventListener('touchmove', handleTouchMove);
            patchnotesList.addEventListener('touchend', handleTouchEnd);
        }

        function removeEventListeners() {
            // Remove scroll event listener
            patchnotesList.removeEventListener('wheel', handleScroll);
            // Remove swipe events listeners
            patchnotesList.removeEventListener('touchstart', handleTouchStart);
            patchnotesList.removeEventListener('touchmove', handleTouchMove);
            patchnotesList.removeEventListener('touchend', handleTouchEnd);
        }

        if (isMobile) {
            addEventListeners();
        }

        return() => {
            removeEventListeners();
        }

    }, [isMobile]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="home">
            <Header />
            <main className="home-main">
                {isMobile && (
                    <Link to="/" className='home-main__logo-link'><img src={Logo} alt="Logo Deadlock France" className='home-main__logo' /><h1 className='home-main__logo-title'>Deadlock<br/>France</h1></Link>
                )}
                <h2 className="home-main__title">Dernières mises à jour</h2>
                <section className="home-main__patchnote-list">
                    {/* [patchnotes[2], patchnotes[0], patchnotes[1] */}
                    {[patchnotes[0], patchnotes[1]].map((patchnote, index) => (
                        <Link to={`/patchnotes/${patchnote.id}`} key={patchnote.id} className={`home-main__patchnote-card ${index === 1 ? 'selected' : ''}`}>
                                <img src={"/src/assets/images/deadlock-test-patch-1.jpg"} alt={patchnote.title} className="home-main__patchnote-image" />
                                <p className="home-main__patchnote-title">{patchnote.title}</p>
                        </Link>
                    ))}
                </section>
                <Link to="/patchnotes" className="home-main__patchnotes-link">Voir toutes les mises à jour</Link>
                <DonateButton />
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;