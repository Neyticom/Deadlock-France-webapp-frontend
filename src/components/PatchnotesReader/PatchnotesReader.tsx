import { useEffect, useState, useRef } from "react";
import type { IPatchnote } from "../../@types";
import { Remark } from "react-remark";
import { Link } from 'react-router-dom';
import './PatchnotesReader.scss';
import './Markdown.scss';





interface PatchnotesReaderProps {
    patchnote: IPatchnote;
    handleSelectedPatchnote: (id: number) => void;
    activePatchnote: number | null;
}

export const PatchnotesReader = ({patchnote, handleSelectedPatchnote, activePatchnote}: PatchnotesReaderProps) => {

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

    const [scrollPosition, setScrollPosition] = useState(0);
    // Permet de récupérer et modifier l'état du scroll en % entre 0 et 100;

    const divRef = useRef<HTMLDivElement>(null);

    // Synchronise la position de la scrollbar avec la position de la fenêtre navigable
    const syncScrollBar = () => {
        if (divRef.current) {
            const maxScrollTop = divRef.current.scrollHeight - divRef.current.clientHeight;
            // Taille de la fenêtre navigable en pixel
            const scrollTop = divRef.current.scrollTop;
            // Distance du scroll par rapport la fenêtre en pixel
            const newScrollPosition = (scrollTop / maxScrollTop) * 100;
            // Position du scroll en %
            setScrollPosition(newScrollPosition);
        }
    };

    // Permet d'appeller la fonction syncScrollBar au scroll sur la fenêtre navigable
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {

        if (divRef.current) {
            divRef.current.addEventListener('scroll', syncScrollBar);
        }

        // Permet de supprimer l'écouteur d'évènement scroll quand le composant est démonté pour éviter les fuites de mémoires et bugs
        return () => {
            if (divRef.current) {
                divRef.current.removeEventListener('scroll', syncScrollBar);
            }
        };
    }, []);

    // Synchronise la position de la fenêtre navigable avec la position de la scrollbar
    const handleScroll = (newPosition: number) => {
        if (divRef.current) {
            const maxScrollTop = divRef.current.scrollHeight - divRef.current.clientHeight;
            const scrollTop = (newPosition * 2 / 100) * maxScrollTop; 
            divRef.current.scrollTop = scrollTop;
        }
        setScrollPosition(newPosition * 2);
    };

    const goToNextPatchnote = () => {
        if (activePatchnote !== null)
        {handleSelectedPatchnote(activePatchnote + 1)}; // Passe à l'ID suivant
    };

    // Fonction pour naviguer vers le patchnote précédent
    const goToPreviousPatchnote = () => {
        if (activePatchnote !== null)
        handleSelectedPatchnote(activePatchnote - 1); // Passe à l'ID précédent
    };

    return(
            <section className="patchnote-reader">

                {!isMobile && (
                    <Link to={'/patchnotes/' + (activePatchnote ? activePatchnote - 1 : '')} className='patchnote-reader__link--left'>
                        <img src="/src/assets/images/chevron-double-right.svg" alt="Se rendre à la patchnote précédente" className="patchnote-reader__link-icon--left"/>
                    </Link>
                )}
                <div className="patchnote-reader__card">
                        <img src={patchnote.image} alt={`Patchnote ${patchnote.version}`} className="patchnote-reader__patchnote-image" />
                        <h2 className="patchnote-reader__patchnote-title">{patchnote.title}</h2>
                </div>
                <div ref={divRef} className="patchnote-reader__content">
                    <Remark>{patchnote.content}</Remark> {/* It will be replaced by custom patchnote entries later*/}
                </div>
                {!isMobile && (
                    <Link to={'/patchnotes/' + (activePatchnote ? activePatchnote + 1 : '')} className='patchnote-reader__link--right'>
                        <img src="/src/assets/images/chevron-double-right.svg" alt="Se rendre à la patchnote suivante" className="patchnote-reader__link-icon--right"/>
                    </Link>
                )}
            </section>
    );
};