import { useState, useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import PatchnotesSelector from '../../components/PatchnotesSelector/PatchnotesSelector';
import { patchnotes } from '../../assets/data';
import './PatchnotesPage.scss';
import { PatchnotesReader } from '../../components/PatchnotesReader/PatchnotesReader';

const PatchnotesPage = () => {

    const [activePatchnote, setActivePatchnote] = useState<number | null>(null);
    const [lastestPatchnote, setLastestPachnote] = useState<number | null>(null);

    useEffect(() => {
        const sortedPatchnotes = [...patchnotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setActivePatchnote(sortedPatchnotes[0].id);
        setLastestPachnote(sortedPatchnotes[0].id);
    }, []);

    const handleSelectedPatchnote = (id: number) => {
        setActivePatchnote(id);
    }

    const selectedPatchnote = patchnotes.find(patchnote => patchnote.id === activePatchnote);

    return (
        <div className="patchnotes-page">
            <Header />
            {selectedPatchnote ? (
                <h1 className='patchnotes-page_title'>{lastestPatchnote === activePatchnote ? "Dernière Patchnote - " + selectedPatchnote.date : "Patchnote du " + selectedPatchnote.date }</h1>
            ) : null}
            <main className='patchnotes-page_content'>
                <PatchnotesSelector patchnotes={patchnotes} activePatchnote={activePatchnote} handleSelectedPatchnote={handleSelectedPatchnote}/>
                {selectedPatchnote ? (
                    <PatchnotesReader patchnote={selectedPatchnote}/>
                ) : null}
            </main>
            <Footer />
        </div>
    );

    
};

export default PatchnotesPage;
