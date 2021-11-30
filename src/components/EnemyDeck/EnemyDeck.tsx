import enemyCard from "../../assets/img/enemyCard.png";
import React from "react";
import "./EnemyDeck.css";

function EnemyCard() {
  return <img className="EnemyCard" src={enemyCard}></img>;
}

export default React.memo(function EnemyDeck() {
  return (
    <div className="EnemyDeck">
      <EnemyCard />
      <EnemyCard />
      <EnemyCard />
      <EnemyCard />
    </div>
  );
});
