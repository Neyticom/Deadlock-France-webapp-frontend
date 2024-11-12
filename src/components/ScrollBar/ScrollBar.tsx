import { useEffect, useRef } from "react";
import './ScrollBar.scss';

// Props de la scrollbar, communiquant avec le composant parent
interface ScrollbarProps {
    size: 1 | 2;
    onScroll: (scrollPosition: number) => void;
    scrollPosition: number;
}

const ScrollBar = ({ size, onScroll, scrollPosition }: ScrollbarProps) => {

    const scrollbarRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const initialMouseY = useRef(0);
    const thumbOffsetY = useRef(0);

    const scrollFactor = 2;

    // Mettre à jour la position de la scrollbar à partir de la position du scroll
    useEffect(() => {
        if (thumbRef.current && scrollbarRef.current) {
            const scrollbarHeight = scrollbarRef.current.clientHeight;
            const thumbHeight = thumbRef.current.clientHeight;
            const maxThumbTop = scrollbarHeight - thumbHeight;
            const thumbTop = (scrollPosition / 100) * maxThumbTop;
            thumbRef.current.style.top = `${thumbTop}px`;
        }
    }, [scrollPosition]);

    // Met à jour en temps réel la position de la scrollbar et le scroll en fonction des déplacements de la souris
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !scrollbarRef.current || !thumbRef.current) return;

        const bounds = scrollbarRef.current.getBoundingClientRect();
        const thumbHeight = thumbRef.current.clientHeight;
        const scrollbarHeight = bounds.height;
        const maxThumbTop = scrollbarHeight - thumbHeight;

        let newThumbTop = e.clientY - bounds.top - thumbOffsetY.current;
        newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));
        const newScrollPosition = (newThumbTop / maxThumbTop) * 100;
        onScroll(newScrollPosition / scrollFactor);
    };

    // Retire les évènements d'écoute de la souris sur la scrollbar quand l'utilisateur relâche le clic
    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    // Ajoute les évènements d'écoute de la souris sur la scrollbar quand l'utilisateur clique dessus
    const handleThumbMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        isDragging.current = true;

        if (!thumbRef.current) return;

        const thumbBounds = thumbRef.current.getBoundingClientRect();

        initialMouseY.current = e.clientY;
        thumbOffsetY.current = e.clientY - thumbBounds.top;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    // Permet de mettre à jour instantanément la position de la scrollbar et du scroll lors du clic scrollbar
    const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!scrollbarRef.current || !thumbRef.current) return;
        const bounds = scrollbarRef.current.getBoundingClientRect();
        const thumbHeight = thumbRef.current.clientHeight;
        const maxThumbTop = bounds.height - thumbHeight;
        const clickPosition = e.clientY - bounds.top - thumbHeight / 2;
        const newScrollPosition = (Math.max(0, Math.min(clickPosition, maxThumbTop)) / maxThumbTop) * 100;
        onScroll(newScrollPosition / scrollFactor);
    };

    return (
        <div
            className={`custom-scrollbar custom-scrollbar-size-${size}`}
            ref={scrollbarRef}
            onClick={handleScrollbarClick}
        >
            <div
                className={`custom-scrollbar-thumb custom-scrollbar-thumb-size-${size}`}
                ref={thumbRef}
                onMouseDown={handleThumbMouseDown}
            />
        </div>
    );
};

export default ScrollBar;
