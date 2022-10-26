import React, { useEffect, useState } from "react";
import './App.css';
import SingleCard from "./compontent/SingleCard";

const cardsImages = [
  {src: "./img/helmet-1.png", matched: false},
  {src: "./img/ring-1.png", matched: false},
  {src: "./img/scroll-1.png", matched: false},
  {src: "./img/potion-1.png", matched: false},
  {src: "./img/sword-1.png", matched: false},
  {src: "./img/shield-1.png", matched: false}
]


function App() {

  const [cards, setCards] = useState([]);
  const [tunrs, setTunrs] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [dispaly, setDispaly] = useState(false);

  //function shuffle
  const  shuffleCards = () => {
    const shuffleImage = [...cardsImages, ...cardsImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));

    setCards(shuffleImage);
    setTunrs(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    
  }

  //choice cards
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //comlet 2 card
  useEffect(() => {

    if(choiceOne && choiceTwo){
      setDispaly(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
         return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn();
      }else{
       setTimeout(() => resetTurn(),1000); 
      }
    }

  },[choiceOne, choiceTwo])

  //reset function
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTunrs(prevTunrs => prevTunrs + 1);
    setDispaly(false);
  }

  //useEffect Bulid the Gmae
  useEffect(() =>{
    shuffleCards();
  }, [])

  return (

    <div className="App">

      <h1>magic match</h1>
      <button onClick={shuffleCards}>new game</button>
      
      <div className="crad-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          code={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          dispaly={dispaly}
          />
        ))}
      </div>
      <p>turns : {tunrs}</p>
    </div>
  );
}

export default App;
