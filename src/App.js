import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";

/* Cards Data */
const imageCards = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
];

function App() {
  /* State */
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);

  /* Shuffle Cards */
  const shuffleCards = () => {
    const shuffled = [...imageCards, ...imageCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  /* Handle Card Choice */
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  /* Reset Turn */
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  /* Compare Cards */
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          );
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  return (
    <div className="App">
      <div className="header">
        <h1>Magic Cards Game</h1>
        <button className="btn-out-line" onClick={shuffleCards}>
          Play New Game
        </button>
      </div>

      <div className="cards-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>

      <p className="Turns">Turns: {turns}</p>
    </div>
  );
}

export default App;
