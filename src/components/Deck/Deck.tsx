import Card from "../Card/Card";
import CardPlaceHolder from "../Game/PlayerSide/UpperTable/CardsOnTable/CardPlaceHolder/CardPlaceHolder";
import "./Deck.css";

function Deck({ playCard, playerHand: hand }: { playCard: Function; playerHand: Array<number> }) {
  return (
    <div className="Deck">
      {hand.map((item: number, index: number) => {
        return hand[index] ? <Card number={hand[index]} index={index} playCard={playCard} key={new Date().getTime() + index} /> : <CardPlaceHolder key={new Date().getTime() + Math.random() * 10} />;
      })}
    </div>
  );
}

export default Deck;
