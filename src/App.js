import React, { useEffect, useState } from 'react';
import Data from './data.json';

import { useForm } from './hooks/useForm';
import FlashcardList from './FlashcardList';


import './App.scss';
import 'animate.css';
function App() {

  const [flashCards, setFlashCards] = useState([]);
  const [formValues, handleInputChange, reset] = useForm({
    numPreguntas: '10',
    categoria: ''
  });


  const {numPreguntas,categoria} = formValues;


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

  };
  // change all cards when the category changes
  useEffect(() => {
    if (categoria) {
      const filteredCards = Data.filter(card => card.categoria === categoria);
      setFlashCards(filteredCards);
    }else{
      setFlashCards([]);
    }
  }, [categoria]);


  return (
    <React.Fragment>

        
      <form className="header" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Dime, ¿cuántas preguntas quieres ver?</label>
          <input
            type="number"
            name="numPreguntas"
            className='formGroup__input-number'
            min="1"
            max="20"
            value={formValues.numPreguntas}
            onChange={handleInputChange}
            />

        </div>
        <div className="formGroup">
          <label>¿De qué teoría?</label>
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
            <option value="">Selecciona una teoría</option>
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
            Generar/Revolver
          </button>
        </div>
      </form>
              <h1>Creador por: <code>Navarrete Zamora Aldo Yael</code> & <code> Nuñez Hernandez Diego Ignacio</code></h1>
              
      <div className="container">
        {
          flashCards.length > 0 ? (
          <FlashcardList
          flashCards={flashCards}
          categoria={categoria}
          numPreguntas={numPreguntas}
          />
          )
          : (
            <div class="no-content animate__animated animate__fadeIn">
              <h1 >Selecciona una Categoría.</h1>
            </div>
          )
        }
      </div>
    </React.Fragment>
  );
}

export default App;
