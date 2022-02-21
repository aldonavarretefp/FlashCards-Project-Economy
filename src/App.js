import React, { useState } from 'react';
import Data from './data.json';

import { useForm } from './hooks/useForm';
import FlashcardList from './FlashcardList';


import './App.scss';
function App() {

  const [flashCards, setFlashCards] = useState(Data);
  const [formValues, handleInputChange, reset] = useForm({
    numPreguntas: '2',
    categoria: ''
  });
  console.log(formValues);


  const handleSubmit = (e) => {
    e.preventDefault();
    const { numPreguntas, categoria } = formValues;
    console.log(categoria);
    //bring n questions from the category
    const filteredCards = Data.filter(card => card.categoria === categoria);
    console.log(filteredCards);
    //randomize the order of the questions
    const randomCards = filteredCards.sort(() => Math.random() - 0.5);
    console.log(randomCards);
    //get the first n questions
    const selectedCards = randomCards.slice(0, numPreguntas);
    console.log(selectedCards);

    setFlashCards(selectedCards);

    reset();

  };

  return (
    <React.Fragment>
      <form className="header" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Numero de preguntas </label>
          <input
            type="number"
            name="numPreguntas"
            style={
              {
                width: '30%',
                margin: '0 auto',
                height: '20px',
              }
            }
            min="1"
            max="10"
            value={formValues.numPreguntas}
            onChange={handleInputChange}
          />

        </div>
        <div className="formGroup">
          <label>Categoria </label>
          <select
            name="categoria"
            id="categoria"
            value={formValues.categoria}
            onChange={handleInputChange}
          >
            <option value="mercantilistas">Selecciona una categoria</option>
            <option value="mercantilistas">Mercantilistas</option>
            <option value="fisiocratas">Fisiócratas</option>
            <option value="economia-politica">Economía Política</option>
          </select>
        </div>
        <div className="formGroup">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Generar
          </button>
        </div>
      </form>
      <div className="container">
        <FlashcardList
          flashCards={flashCards}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
