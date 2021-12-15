import "./RoundsWon.css";
import React from "react";

export default React.memo(function RoundsWon({ playerRoundsWon }: { playerRoundsWon: number }) {
  return (
    <div className="RoundsWon">
      {playerRoundsWon >= 1 ? (
        <div className="CircleRed"></div>
      ) : (
        <div className="CircleGrey"></div>
      )}
      {playerRoundsWon >= 2 ? (
        <div className="CircleRed"></div>
      ) : (
        <div className="CircleGrey"></div>
      )}
      {playerRoundsWon >= 3 ? (
        <div className="CircleRed"></div>
      ) : (
        <div className="CircleGrey"></div>
      )}
    </div>
  );
});
