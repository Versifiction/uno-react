import { useEffect, useState } from "react";
import Card from "../Card";

const COLORS = ["blue", "green", "red", "yellow"];
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const DELAY = 2;

const Board = () => {
  const [pile, setPile] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [turn, setTurn] = useState("player");
  const [gameStarted, setGameStarted] = useState(false);

  const topOfPileCard = pile[0] || {};
  const playerHasWon = playerCards.length === 0;
  const computerHasWon = computerCards.length === 0;

  const createPile = () => {
    let tempPile = [];

    for (let i = 0; i < NUMBERS.length; i++) {
      for (let j = 0; j < COLORS.length; j++) {
        if (i == 0) {
          tempPile.push({
            color: COLORS[j],
            number: i,
            id: `${COLORS[j]}-${i}`,
          });
        } else {
          tempPile.push({
            color: COLORS[j],
            number: i,
            id: `${COLORS[j]}-${i}`,
          });
          tempPile.push({
            color: COLORS[j],
            number: i,
            id: `${COLORS[j]}-${i}-second`,
          });
        }
      }
    }

    const shuffledPile = shuffleCards(tempPile);

    setPlayerCards(shuffledPile.slice(0, 7));
    setComputerCards(shuffledPile.slice(8, 15));

    setPile(shuffledPile);
  };

  const shuffleCards = (array) => {
    const newArray = [...array];

    newArray.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return newArray;
  };

  const cardCanBePlayed = (card) => {
    return (
      card.color === topOfPileCard.color || card.number === topOfPileCard.number
    );
  };

  const playerPlayingCard = (card) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (cardCanBePlayed(card) && turn === "player") {
      setPile([card, ...pile]);
      setPlayerCards(playerCards.filter((c) => card.id !== c.id));

      setTurn("computer");
    }
  };

  const computerPlayingCard = () => {
    let itemsProcessed = 0;
    let shouldSkip = false;

    setTimeout(() => {
      computerCards.forEach((card) => {
        itemsProcessed++;

        if (shouldSkip) {
          return;
        }

        if (cardCanBePlayed(card)) {
          setPile([card, ...pile]);
          setComputerCards(computerCards.filter((c) => card.id !== c.id));
          setTurn("player");
          shouldSkip = true;
        }

        if (itemsProcessed === computerCards.length) {
          console.log("pioche ", itemsProcessed, computerCards.length);
          drawingCard("computer");
        }
      });
    }, DELAY * 1000);
  };

  const drawingCard = (person) => {
    const newPile = [...pile];
    const poppedCard = newPile.pop();

    setPile(newPile);

    if (person === "computer") {
      setComputerCards([...computerCards, poppedCard]);
      setTurn("player");
    } else {
      setPlayerCards([...playerCards, poppedCard]);
      setTurn("computer");
    }
  };

  useEffect(() => {
    createPile();
  }, []);

  useEffect(() => {
    if (turn === "computer") {
      computerPlayingCard();
    }
  }, [turn]);

  useEffect(() => {
    if ((playerHasWon || computerHasWon) && gameStarted) {
      alert(`${playerHasWon ? "Joueur" : "Ordinateur"} a gagné !`);
    }
  }, [playerHasWon, computerHasWon]);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex justify-center mb-6">
        {computerCards.map((card, index) => (
          <Card
            color={card?.color}
            number={card?.number}
            returned={false}
            canBePlayed={false}
            turn={turn === "computer"}
            index={index}
            owned="computer"
          />
        ))}
      </div>
      <div className="flex justify-center items-center mb-6">
        <Card
          color={topOfPileCard?.color}
          number={topOfPileCard?.number}
          returned={true}
          canBePlayed={false}
        />
        <button
          className="rounded-full w-16 h-16 text-2xl shadow-sm bg-[#0F172A] text-[#fff] ml-24"
          onClick={drawingCard}
        >
          +1
        </button>
      </div>
      <div className="flex justify-center">
        {playerCards.map((card, index) => (
          <div onClick={() => playerPlayingCard(card)}>
            <Card
              color={card?.color}
              number={card?.number}
              returned={true}
              canBePlayed={cardCanBePlayed(card)}
              turn={turn === "player"}
              index={index}
              owned="player"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
