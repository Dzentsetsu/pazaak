import "./EnemyCardsOnTable.css";
import EnemyCardPlaceHolder from "./EnemyCardPlaceHolder/EnemyCardPlaceHolder";
import Card from "../../../Card/Card";
import React from "react";

export default React.memo(function EnemyCardsOnTable({
  enemyCardsOnTable,
}: {
  enemyCardsOnTable: Array<number>;
}) {
  return (
    <div className="EnemyCardsOnTable">
      {enemyCardsOnTable.length >= 1 ? (
        <Card number={enemyCardsOnTable[0]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 2 ? (
        <Card number={enemyCardsOnTable[1]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 3 ? (
        <Card number={enemyCardsOnTable[2]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 4 ? (
        <Card number={enemyCardsOnTable[3]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 5 ? (
        <Card number={enemyCardsOnTable[4]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 6 ? (
        <Card number={enemyCardsOnTable[5]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 7 ? (
        <Card number={enemyCardsOnTable[6]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 8 ? (
        <Card number={enemyCardsOnTable[7]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
      {enemyCardsOnTable.length >= 9 ? (
        <Card number={enemyCardsOnTable[8]} />
      ) : (
        <EnemyCardPlaceHolder />
      )}
    </div>
  );
});
