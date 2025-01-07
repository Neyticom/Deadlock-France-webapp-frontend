import { useRef } from 'react';
// import ScrollBar from '../ScrollBar/ScrollBar';
import './PatchnotesSelector.scss';
import type { IPatchnote } from '../../@types';
interface PatchnotesSelectorProps {
    patchnotes: IPatchnote[];
    activePatchnote: number | null;
    handleSelectedPatchnote: (id: number) => void;
}

function PatchnotesSelector ({patchnotes, activePatchnote, handleSelectedPatchnote}: PatchnotesSelectorProps) {

    // const [scrollPosition, setScrollPosition] = useState(0);
    // Permet de récupérer et modifier l'état du scroll en % entre 0 et 100;

    const listRef = useRef<HTMLUListElement>(null);

    // Synchronise la position de la scrollbar avec la position de la fenêtre navigable
    // const syncScrollBar = () => {
    //     if (listRef.current) {
    //         const maxScrollLeft = listRef.current.scrollWidth - listRef.current.clientWidth;
    //         // Taille de la fenêtre navigable en pixel
    //         const scrollLeft = listRef.current.scrollLeft;
    //         // Distance du scroll par rapport la fenêtre en pixel
    //         const newScrollPosition = (scrollLeft / maxScrollLeft) * 100;
    //         // Position du scroll en %
    //         setScrollPosition(newScrollPosition);
    //     }
    // };

    // Permet d'appeller la fonction syncScrollBar au scroll sur la fenêtre navigable
    //     useEffect(() => {

    //     if (listRef.current) {
    //         listRef.current.addEventListener('scroll', syncScrollBar);
    //     }

    //     // Permet de supprimer l'écouteur d'évènement scroll quand le composant est démonté pour éviter les fuites de mémoires et bugs
    //     return () => {
    //         if (listRef.current) {
    //             listRef.current.removeEventListener('scroll', syncScrollBar);
    //         }
    //     };
    // }, []);

    // // Synchronise la position de la fenêtre navigable avec la position de la scrollbar
    // const handleScroll = (newPosition: number) => {
    //     if (listRef.current) {
    //         const maxScrollTop = listRef.current.scrollHeight - listRef.current.clientHeight;
    //         const scrollTop = (newPosition * 2 / 100) * maxScrollTop; 
    //         listRef.current.scrollTop = scrollTop;
    //     }
    //     setScrollPosition(newPosition * 2);
    // };

    return (
        <div className="patchnotes-selector">
            <ul ref={listRef} className='patchnotes-selector_list'>
                {patchnotes.map(patchnote => (
                    
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<li 
                    key={patchnote.id}
                    onClick={() => handleSelectedPatchnote(patchnote.id)}
                    className={patchnote.id === activePatchnote ? 'patchnotes-selector_active-option' : 'patchnotes-selector_option'} 
                    data-patchnote-id={patchnote.id}
                >
                    <img 
                        src={patchnote.image} 
                        alt={`Patchnote ${patchnote.version}`} 
                        className='patchnotes-selector_image' 
                    />
                    <div className='patchnotes-selector_info'>
                        {/* biome-ignore lint/style/useTemplate: <explanation> */}
                        <span className='patchnotes-selector_version'>{"v" + patchnote.version}</span>
                        <span className='patchnotes-selector_date'>{patchnote.date}</span>
                    </div>
                </li>
            ))}
            </ul>
            {/* <ScrollBar size={1} onScroll={handleScroll} scrollPosition={scrollPosition} /> */}
        </div>
    );
};

export default PatchnotesSelector;