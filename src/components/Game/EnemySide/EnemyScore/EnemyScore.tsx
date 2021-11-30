import React from "react";

export default React.memo(function EnemyScore({
  enemyScore,
}: {
  enemyScore: number;
}) {
  return <div className="EnemyScore">{enemyScore}</div>;
});
