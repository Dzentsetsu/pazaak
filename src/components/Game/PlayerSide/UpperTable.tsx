import "../UpperTable.css";
import Turn from "./UpperTable/Turn/Turn";
import NamePlate from "./UpperTable/NamePlate/NamePlate";
import Score from "./UpperTable/Score/Score";
import RoundsWon from "./UpperTable/RoundsWon/RoundsWon";
import CardsOnTable from "./UpperTable/CardsOnTable/CardsOnTable";

export default function UpperTable({
  score,
  turn,
  roundsWon,
  cardsOnTable,
}: {
  score: number;
  turn: boolean;
  roundsWon: number;
  cardsOnTable: Array<number>;
}) {
  return (
    <div className="UpperTable">
      <Turn playerTurn={turn} />
      <NamePlate />
      <Score playerScore={score} />
      <RoundsWon playerRoundsWon={roundsWon} />
      <CardsOnTable playerCardsOnTable={cardsOnTable} />
    </div>
  );
}
