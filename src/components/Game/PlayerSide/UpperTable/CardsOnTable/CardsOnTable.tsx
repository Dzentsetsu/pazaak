import "./CardsOnTable.css";
import CardPlaceHolder from "./CardPlaceHolder/CardPlaceHolder";
import Card from "../../../../Card/Card";
import React from "react";

export default function CardsOnTable({ playerCardsOnTable }: { playerCardsOnTable: any }) {
  return (
    <div className="CardsOnTable">
      {playerCardsOnTable[0] ? <Card number={playerCardsOnTable[0]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[1] ? <Card number={playerCardsOnTable[1]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[2] ? <Card number={playerCardsOnTable[2]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[3] ? <Card number={playerCardsOnTable[3]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[4] ? <Card number={playerCardsOnTable[4]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[5] ? <Card number={playerCardsOnTable[5]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[6] ? <Card number={playerCardsOnTable[6]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[7] ? <Card number={playerCardsOnTable[7]} /> : <CardPlaceHolder />}
      {playerCardsOnTable[8] ? <Card number={playerCardsOnTable[8]} /> : <CardPlaceHolder />}
    </div>
  );
}
