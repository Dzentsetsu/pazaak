import "./UpperTable.css";
import Turn from "./Turn/Turn";
import NamePlate from "./NamePlate/NamePlate";
import Score from "./Score/Score";
import RoundsWon from "./RoundsWon/RoundsWon";
import CardsOnTable from "./CardsOnTable/CardsOnTable";
import React from "react";

export default React.memo(
  function UpperTable(props: any) {
    const { playerScore, playerTurn, playerRoundsWon, playerCardsOnTable } =
      props.player;

    console.log("From Upper Table");
    return (
      <div className="UpperTable">
        <Turn playerTurn={playerTurn} />
        <NamePlate />
        <Score playerScore={playerScore} />
        <RoundsWon playerRoundsWon={playerRoundsWon} />
        <CardsOnTable playerCardsOnTable={playerCardsOnTable} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps);
    return false;
  }
);
