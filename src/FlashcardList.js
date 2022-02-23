import React, { useEffect } from 'react'
import Flashcard from './Flashcard';

import 'animate.css';
const FlashcardList = ({flashCards,categoria,numPreguntas}) => {

    useEffect(() => {
        console.log('FlashcardList useEffect');
        console.log(flashCards);
        //toggle animated class to card-grid
        document.querySelector('.container-card-grid').classList.add('animate__fadeIn');
        
        return () => {
            //make slow animation when leaving the page
            document.querySelector('.container-card-grid').classList.remove('animate__fadeIn');


        }
    },[flashCards]);

    return (
        <div className="container-card-grid animate__animated">
            <h2>Mostrando <em>{numPreguntas}</em> preguntas para el tema de <em>{`${categoria}`.charAt(0).toUpperCase() + `${categoria}`.slice(1)}</em></h2>

            <div className ="card-grid" >
                {
                    flashCards.map(flashCard => (
                        <Flashcard
                            key={flashCard.id}
                            flashCard={flashCard}
                        />
                    ))
                }
            </div>
            
        </div>
    )
}

export default FlashcardList
