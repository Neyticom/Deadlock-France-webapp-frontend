import { useState, useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import PatchnotesSelector from '../../components/PatchnotesSelector/PatchnotesSelector';
import './PatchnotesPage.scss';
import { PatchnotesReader } from '../../components/PatchnotesReader/PatchnotesReader';
import { getPatchnotes } from "../../api/patchnoteApi";
import { Routes, Route, useNavigate, useLocation, Link, useParams } from 'react-router-dom';

interface Patchnote {
    id: number;
    title: string;
    content: string;
    author: string;
    version: string;
    state: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    date: Date;
    patchnote_entries: PatchnoteEntry[];
    createdAt: Date;
    updatedAt: Date;
}

interface PatchnoteEntry {
    id: number;
    category: 'BUFF' | 'NERF' | 'CHANGE' | 'FIX';
    patchnote_id: number;
    position: number;
    description: string;
    ressource_id: number;
    ressource_type: 'HERO' | 'ITEM' | 'SPELL';
    createdAt: Date;
    updatedAt: Date;
}

const PatchnotesPage = () => {

    const { id } = useParams<{ id: string }>();
    const patchnoteId = id ? parseInt(id, 10) : null;
    
    const [patchnotes, setPatchnotes] = useState<Patchnote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatchnotes = async () => {
          try {
            const data = await getPatchnotes();
            setPatchnotes(data);
            console.log(data);
          } catch (error) {
            console.log(error);
            setError("Erreur lors du chargement des patchnotes");
          } finally {
            setLoading(false);
          }
        };
    
        fetchPatchnotes();
    }, []);

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

    useEffect(() => {
        if (patchnotes.length === 0) return;
        const sortedPatchnotes = [...patchnotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setActivePatchnote(patchnoteId)
        setLastestPachnote(sortedPatchnotes[0].id);
    }, [patchnotes, patchnoteId]);

    const handleSelectedPatchnote = (id: number) => {
        setActivePatchnote(id);
    }

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

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
                <Route path=":id" element={
                    <>
                        <Header />
                        <main className='patchnote-main'>
                            {isMobile && (
                                <Link to='/patchnotes/' className='patchnote-main__link-back'>{'⬅'} Revenir à la liste des patchnotes</Link>
                            )}
                            {!isMobile && (
                                <PatchnotesSelector patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote}/>
                            )}

                            {activePatchnote && (
                                <PatchnotesReader patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote} />
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