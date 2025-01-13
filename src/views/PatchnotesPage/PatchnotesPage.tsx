import { useState, useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import PatchnotesSelector from '../../components/PatchnotesSelector/PatchnotesSelector';
import { patchnotes } from '../../assets/data';
import './PatchnotesPage.scss';
import { PatchnotesReader } from '../../components/PatchnotesReader/PatchnotesReader';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

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
        <div className="patchnotes-page">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <main className='patchnotes-page_content'>
                            <PatchnotesSelector patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote}/>
                        </main>
                        <Footer />
                    </>
                }/>
                <Route path=":params" element={
                    <>
                        <Header />
                        <main className='patchnotes-page_content'>
                            {selectedPatchnote ? (
                                <h1 className='patchnotes-page_title'>{lastestPatchnote === activePatchnote ? `Dernière Patchnote - ${selectedPatchnote.date}` : `Patchnote du ${selectedPatchnote.date}` }</h1>
                            ) : null}

                            {!isMobile && (
                                <PatchnotesSelector patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote}/>
                            )}

                            {selectedPatchnote ? (
                                <PatchnotesReader patchnote={selectedPatchnote} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote} />
                            ) : null}
                        </main>
                        <Footer />
                    </>
                }/>
            </Routes>
        </div>
    );

    
};

export default PatchnotesPage;