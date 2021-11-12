import "./EnemyUpperTable.css";
import EnemyTurn from "./EnemyTurn/EnemyTurn";

import EnemyNamePlate from "./EnemyNamePlate/EnemyNamePlate";
import EnemyScore from "./EnemyScore/EnemyScore";
import EnemyRoundsWon from "./EnemyRoundsWon/EnemyRoundsWon";
import EnemyCardsOnTable from "./EnemyCardsOnTable/EnemyCardsOnTable";

function EnemyUpperTable(props: any) {
  const { enemyScore, enemyTurn, enemyRoundsWon, enemyCardsOnTable} =
    props.enemy;
  return (
    <div className="EnemyUpperTable">
      <EnemyTurn enemyTurn={enemyTurn} />
      <EnemyNamePlate />
      <EnemyScore enemyScore={enemyScore} />
      <EnemyRoundsWon enemyRoundsWon={enemyRoundsWon} />
      <EnemyCardsOnTable enemyCardsOnTable={enemyCardsOnTable}/>
    </div>
  );
}

export default EnemyUpperTable;
