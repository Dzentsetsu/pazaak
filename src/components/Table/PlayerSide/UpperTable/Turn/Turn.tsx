import "./Turn.css";
import React from "react";

export default React.memo(function Turn({
  playerTurn,
}: {
  playerTurn: boolean;
}) {
  return (
    <div className="TurnContainer">
      {playerTurn ? (
        <div className="Turn"></div>
      ) : (
        <div className="NotMyTurn"></div>
      )}
    </div>
  );
});
