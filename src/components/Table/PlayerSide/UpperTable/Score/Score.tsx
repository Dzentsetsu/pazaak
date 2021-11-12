import "./Score.css";
import React from "react";

export default React.memo(function Score({
  playerScore,
}: {
  playerScore: number;
}) {
  return <div className="Score">{playerScore}</div>;
});
