import "../UpperTable.css";
import Turn from "./UpperTable/Turn/Turn";
import NamePlate from "./UpperTable/NamePlate/NamePlate";
import Score from "./UpperTable/Score/Score";
import RoundsWon from "./UpperTable/RoundsWon/RoundsWon";
import CardsOnTable from "./UpperTable/CardsOnTable/CardsOnTable";
import React from "react";

export default React.memo(function UpperTable(props: any) {
  // console.log("UpperTable rerenders");
  return (
    <div className="UpperTable">
      <Turn playerTurn={props.playerTurn} />
      <NamePlate />
      <Score playerScore={props.playerScore} />
      <RoundsWon playerRoundsWon={props.playerRoundsWon} />
      <CardsOnTable playerCardsOnTable={props.playerCardsOnTable} />
    </div>
  );
});
