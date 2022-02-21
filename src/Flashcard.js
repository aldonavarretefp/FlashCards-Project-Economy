import React,{useState,useEffect, useRef} from 'react'

export default function Flashcard({flashCard}) {

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');
    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        const maxHeight = Math.max(frontHeight, backHeight,100);
        setHeight(maxHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    }, []);

    useEffect(setMaxHeight, [flashCard.respuesta, flashCard.titulo, flashCard.categoria]);

    return (
        <div
            onClick={() => setFlip(!flip)}
            className={`card ${flip ? 'flip' : ''}`}
        >
            <div className="front" ref={frontEl}>
                <h2>{flashCard.titulo}</h2>
            </div>
            <div className="back" ref={backEl}><p>{flashCard.respuesta}</p></div>
        </div>
    )
}

