import React, { useState } from 'react';
import Data from './data.json';

import { useForm } from './hooks/useForm';
import FlashcardList from './FlashcardList';


import './App.scss';
function App() {

  const [flashCards, setFlashCards] = useState([]);
  const [formValues, handleInputChange, reset] = useForm({
    numPreguntas: '10',
    categoria: ''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    const { numPreguntas, categoria } = formValues;
    //bring n questions from the category
    const filteredCards = Data.filter(card => card.categoria === categoria);
    //randomize the order of the questions
    const randomCards = filteredCards.sort(() => Math.random() - 0.5);
    //get the first n questions
    const selectedCards = randomCards.slice(0, numPreguntas);

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
            max="20"
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
            style={
              {
                fontSize: '1rem'
              }
            }
            >
            <option value="">Selecciona una categoria</option>
            <option value="mercantilistas">Mercantilistas</option>
            <option value="fisiocratas">Fisiócratas</option>
            <option value="economia-politica">Economía Política</option>
            <option value="clasicos">Clásicos</option>
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
              <h1>Creador por: <code>Navarrete Zamora Aldo Yael & Nuñez Hernandez Diego Ignacio</code></h1>
      <div className="container">
        {
          flashCards.length > 0 ? (
          <FlashcardList
          flashCards={flashCards}
          />
          )
          : (
            <h1>Selecciona una Categoría.</h1>
          )
        }
      </div>
    </React.Fragment>
  );
}

export default App;
