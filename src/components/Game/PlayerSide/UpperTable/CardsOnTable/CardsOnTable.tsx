import "./CardsOnTable.css";
import CardPlaceHolder from "./CardPlaceHolder/CardPlaceHolder";
import Card from "../../../../Card/Card";
import React from "react";

export default React.memo(function CardsOnTable({
  playerCardsOnTable,
}: {
  playerCardsOnTable: any;
}) {
  return (
    <div className="CardsOnTable">
      {playerCardsOnTable.length >= 1 ? (
        <Card number={playerCardsOnTable[0]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 2 ? (
        <Card number={playerCardsOnTable[1]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 3 ? (
        <Card number={playerCardsOnTable[2]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 4 ? (
        <Card number={playerCardsOnTable[3]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 5 ? (
        <Card number={playerCardsOnTable[4]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 6 ? (
        <Card number={playerCardsOnTable[5]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 7 ? (
        <Card number={playerCardsOnTable[6]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 8 ? (
        <Card number={playerCardsOnTable[7]} />
      ) : (
        <CardPlaceHolder />
      )}
      {playerCardsOnTable.length >= 9 ? (
        <Card number={playerCardsOnTable[8]} />
      ) : (
        <CardPlaceHolder />
      )}
    </div>
  );
});
