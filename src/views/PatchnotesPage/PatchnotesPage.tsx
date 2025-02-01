import { useState, useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import PatchnotesSelector from '../../components/PatchnotesSelector/PatchnotesSelector';
import { patchnotes } from '../../assets/data';
import './PatchnotesPage.scss';
import { PatchnotesReader } from '../../components/PatchnotesReader/PatchnotesReader';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';

const PatchnotesPage = () => {

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleResize  = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        handleResize(mediaQuery);
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!isMobile && location.pathname === '/patchnotes'){
            navigate('/patchnotes/1');
        }
    }, [isMobile, location.pathname, navigate]);

    const [activePatchnote, setActivePatchnote] = useState<number | null>(null);
    const [lastestPatchnote, setLastestPachnote] = useState<number | null>(null);
    const selectedPatchnote = patchnotes.find(patchnote => patchnote.id === activePatchnote);

    useEffect(() => {
        const sortedPatchnotes = [...patchnotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setActivePatchnote(sortedPatchnotes[0].id);
        setLastestPachnote(sortedPatchnotes[0].id);
    }, []);

    const handleSelectedPatchnote = (id: number) => {
        setActivePatchnote(id);
    }

    return (
        <div className="patchnote-page">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <main className='patchnote-main'>
                            <h2 className='patchnote-main__title'>Mises à jour</h2>
                            <PatchnotesSelector patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote}/>
                        </main>
                        <Footer />
                    </>
                }/>
                <Route path=":params" element={
                    <>
                        <Header />
                        <main className='patchnote-main'>
                            {isMobile && (
                                <Link to='/patchnotes/' className='patchnote-main__link-back'>{'⬅'} Revenir à la liste des patchnotes</Link>
                            )}
                            {!isMobile && (
                                <PatchnotesSelector patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote}/>
                            )}

                            {selectedPatchnote && (
                                <PatchnotesReader patchnote={selectedPatchnote} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote} />
                            )}
                        </main>
                        <Footer />
                    </>
                }/>
            </Routes>
        </div>
    );

    
};

export default PatchnotesPage;