import React from 'react'
import Flashcard from './Flashcard';


const FlashcardList = ({flashCards,category}) => {
    console.log(flashCards);
    return (
        <div className ="card-grid">
            {
                flashCards.map(flashCard => (
                    <Flashcard
                        key={flashCard.id}
                        flashCard={flashCard}
                    />
                ))
            }
        </div>
    )
}

export default FlashcardList
