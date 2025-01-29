import { useEffect, useState, useRef } from "react";
import type { IPatchnote } from "../../@types";
import { Remark } from "react-remark";
import ScrollBar from "../ScrollBar/ScrollBar";
import './PatchnotesReader.scss';
import './Markdown.scss';





interface PatchnotesReaderProps {
    patchnote: IPatchnote;
    handleSelectedPatchnote: (id: number) => void;
    activePatchnote: number | null;
}

export const PatchnotesReader = ({patchnote, handleSelectedPatchnote, activePatchnote}: PatchnotesReaderProps) => {


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
            <div className="patchnotes-reader">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                className="patchnotes-reader_button patchnotes-reader_button--left"
                onClick={goToPreviousPatchnote}
                aria-label="Patchnote précédent"
                disabled={activePatchnote === null || activePatchnote <= 1} // Désactive le bouton si on est au premier patchnote
            >
                <img src="/src/assets/images/chevron-double-right.svg" alt="Flèche gauche" />
            </button>
                <ScrollBar size={2} onScroll={handleScroll} scrollPosition={scrollPosition} />
                <div ref={divRef} className="patchnotes-reader_content">
                    <img src={patchnote.image} alt={`Patchnote ${patchnote.version}`} className="patchnote-reader_image" />
                    <h2 className="patchnote_title">{`Patchnote v${patchnote.version} - "${patchnote.title}"`}</h2>
                    <Remark>{patchnote.content}</Remark>
                </div>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                className="patchnotes-reader_button patchnotes-reader_button--right"
                onClick={goToNextPatchnote}
                aria-label="Patchnote suivant"
            >
                <img src="/src/assets/images/chevron-double-right.svg" alt="Flèche droite" className="" />
            </button>
            </div>
    );
};