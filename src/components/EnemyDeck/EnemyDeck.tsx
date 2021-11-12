import CardPlaceHolder from "../Table/PlayerSide/UpperTable/CardsOnTable/CardPlaceHolder/CardPlaceHolder";
import "../Table/PlayerSide/UpperTable/CardsOnTable/CardPlaceHolder/CardPlaceHolder.css";
import enemyCard from "../../assets/img/enemyCard.png";
import "./EnemyDeck.css";

function EnemyDeck() {
  return (
    <div className="EnemyDeck">
      <EnemyCard />
      <EnemyCard />
      <EnemyCard />
      <EnemyCard />
    </div>
  );
}

export default EnemyDeck;

function EnemyCard() {
  return <img className="EnemyCard" src={enemyCard}></img>;
}
