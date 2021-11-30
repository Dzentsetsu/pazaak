import "./EnemyRoundsWon.css";

import React from "react";

export default React.memo(function EnemyRoundsWon({
  enemyRoundsWon,
}: {
  enemyRoundsWon: number;
}) {
  return (
    <div className="EnemyRoundsWon">
      {enemyRoundsWon >= +1 ? (
        <div className="CircleRed"></div>
      ) : (
        <div className="CircleGrey"></div>
      )}
      {enemyRoundsWon >= 2 ? (
        <div className="CircleRed"></div>
      ) : (
        <div className="CircleGrey"></div>
      )}
      {enemyRoundsWon >= 3 ? (
        <div className="CircleRed"></div>
      ) : (
        <div className="CircleGrey"></div>
      )}
    </div>
  );
});
