import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import './PatchnotesReader.scss';
import './Markdown.scss';

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
    ressource_type: 'HERO' | 'ITEM' | 'SPELL' | 'GLOBAL';
    createdAt: Date;
    updatedAt: Date;
}

interface PatchnotesReaderProps {
    patchnotes: Patchnote[];
    handleSelectedPatchnote: (id: number) => void;
    activePatchnote: number | null;
}

export const PatchnotesReader = ({patchnotes, handleSelectedPatchnote, activePatchnote}: PatchnotesReaderProps) => {

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

    const patchnote = patchnotes.find(patchnote => patchnote.id === activePatchnote);

    const groupedEntries: Record<PatchnoteEntry["ressource_type"], PatchnoteEntry[]> = {
        GLOBAL: [],
        ITEM: [],
        HERO: [],
        SPELL: []
    };

    patchnotes.map(patchnote => {
        patchnote.patchnote_entries.forEach(entry => {
            if (groupedEntries[entry.ressource_type]) {
                groupedEntries[entry.ressource_type].push(entry);
            }
        });
    })

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const categories = [
        { key: "GLOBAL", title: "Modifications générales" },
        { key: "ITEM", title: "Modifications des objets" },
        { key: "HERO", title: "Modifications des héros" }
    ];
    
    return(
            <section className="patchnote-reader">

                {!isMobile && (
                    <Link to={'/patchnotes/' + (activePatchnote ? activePatchnote - 1 : '')} className='patchnote-reader__link--left'>
                        <img src="/src/assets/images/chevron-double-right.svg" alt="Se rendre à la patchnote précédente" className="patchnote-reader__link-icon--left"/>
                    </Link>
                )}
                {patchnote && (
                    <>
                        <div className="patchnote-reader__card">
                            <img src={"/src/assets/images/deadlock-test-patch-1.jpg"} alt={`Patchnote ${patchnote.version}`} className="patchnote-reader__patchnote-image" />
                            <h2 className="patchnote-reader__patchnote-title">{patchnote.title}</h2>
                        </div>
                        <div ref={divRef} className="patchnote-content">
                            <h3>{patchnote.content}</h3>
                            <p>Mise à jour {patchnote.version} du {new Date(patchnote.date).toLocaleDateString("fr-FR", options)}</p>
                            <Link to={''}>Patchnote officielle</Link>
                            {/*  'HERO' | 'ITEM' | 'SPELL' | 'GLOBAL'*/}

                            {/* 🔥 Boucle dynamique sur les catégories */}
                            {categories.map(({ key, title }) => {
                                const filteredEntries = patchnote.patchnote_entries.filter(entry => entry.ressource_type === key);

                                // 🔹 Si on est dans `ITEM`, on trie par `ressource_id`
                                if (key === "ITEM") {
                                    const groupedEntries: Record<number, PatchnoteEntry[]> = {};
                                    filteredEntries.forEach(entry => {
                                        if (!groupedEntries[entry.ressource_id]) groupedEntries[entry.ressource_id] = [];
                                        groupedEntries[entry.ressource_id].push(entry);
                                    });

                                    return filteredEntries.length > 0 && (
                                        <>
                                            <h4>{title}</h4>
                                            {Object.entries(groupedEntries).map(([ressourceId, entries]) => (
                                                <section key={`item-${ressourceId}`} className="patchnote-content__section">
                                                    <h5>{`Objet #${ressourceId}`}</h5>
                                                    {entries.map(entry => (
                                                        <article key={entry.id} className="patchnote-content__entry">
                                                            <p className="patchnote-content__entry-category">{entry.category}</p>
                                                            <p className="patchnote-content__entry-description">{entry.description}</p>
                                                        </article>
                                                    ))}
                                                </section>
                                            ))}
                                        </>
                                    )
                                }

                                // 🔹 Gestion des HÉROS & SORTS associés
                                if (key === "HERO") {
                                    // Grouper les HÉROS par `ressource_id`
                                    const groupedHeroes: Record<number, PatchnoteEntry[]> = {};
                                    filteredEntries.forEach(entry => {
                                        if (!groupedHeroes[entry.ressource_id]) groupedHeroes[entry.ressource_id] = [];
                                        groupedHeroes[entry.ressource_id].push(entry);
                                    });

                                    // Associer les SPELLS à leur HÉRO
                                    const spellEntries = patchnote.patchnote_entries.filter(entry => entry.ressource_type === "SPELL");
                                    const groupedSpells: Record<number, PatchnoteEntry[]> = {};

                                    spellEntries.forEach(entry => {
                                        if (!groupedSpells[entry.ressource_id]) groupedSpells[entry.ressource_id] = [];
                                        groupedSpells[entry.ressource_id].push(entry);
                                    });

                                    return filteredEntries.length > 0 && (
                                        <section key={key} className="patchnote-content__section">
                                            <h4>{title}</h4>
                                            {Object.entries(groupedHeroes).map(([heroId, heroEntries]) => (

                                                <div key={`hero-${heroId}`} className="patchnote-content__hero">
                                                    <h5>Héros #{heroId}</h5>
                                                    {heroEntries.map(entry => (
                                                        <article key={entry.id} className="patchnote-content__entry">
                                                            <p className="patchnote-content__entry-category">{entry.category}</p>
                                                            <p className="patchnote-content__entry-description">{entry.description}</p>
                                                        </article>
                                                    ))}

                                                    {/* 🔥 Afficher les sorts du héros */}
                                                    {groupedSpells[Number(heroId)] && (
                                                        <div className="patchnote-content__spells">
                                                            {groupedSpells[Number(heroId)].map((spell: PatchnoteEntry) => (
                                                                <div key={`spell-${spell.id}`} className="patchnote-content__spell">
                                                                    <h6>Sort #{spell.ressource_id}</h6>
                                                                    <article key={spell.id} className="patchnote-content__entry">
                                                                        <p className="patchnote-content__entry-category">{spell.category}</p>
                                                                        <p className="patchnote-content__entry-description">{spell.description}</p>
                                                                    </article>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </section>
                                    )
                                }

                                return filteredEntries.length > 0 && (
                                    <section key={key} className="patchnote-content__section">
                                        <h4>{title}</h4>
                                        {filteredEntries.map(entry => (
                                            <article key={entry.id} className="patchnote-content__entry">
                                                <p className="patchnote-content__entry-category">{entry.category}</p>
                                                <p className="patchnote-content__entry-description">{entry.description}</p>
                                            </article>
                                        ))}
                                    </section>
                                );
                            })}
                        </div>
                    </>
                )}
                {!isMobile && (
                    <Link to={'/patchnotes/' + (activePatchnote ? activePatchnote + 1 : '')} className='patchnote-reader__link--right'>
                        <img src="/src/assets/images/chevron-double-right.svg" alt="Se rendre à la patchnote suivante" className="patchnote-reader__link-icon--right"/>
                    </Link>
                )}
            </section>
    );
};