import "./EnemyUpperTable.css";
import EnemyTurn from "./EnemyTurn/EnemyTurn";

import EnemyNamePlate from "./EnemyNamePlate/EnemyNamePlate";
import EnemyScore from "./EnemyScore/EnemyScore";
import EnemyRoundsWon from "./EnemyRoundsWon/EnemyRoundsWon";
import EnemyCardsOnTable from "./EnemyCardsOnTable/EnemyCardsOnTable";

function EnemyUpperTable(props: any) {
  return (
    <div className="EnemyUpperTable">
      <EnemyTurn enemyTurn={props.enemyTurn} />
      <EnemyNamePlate />
      <EnemyScore enemyScore={props.enemyScore} />
      <EnemyRoundsWon enemyRoundsWon={props.enemyRoundsWon} />
      <EnemyCardsOnTable enemyCardsOnTable={props.enemyCardsOnTable} />
      {props.computerStanded && <div className="Darkened">&nbsp;</div>}
    </div>
  );
}

export default EnemyUpperTable;
