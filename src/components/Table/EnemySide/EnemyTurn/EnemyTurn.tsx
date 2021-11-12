function EnemyTurn({ enemyTurn }: { enemyTurn: boolean }) {
  return (
    <div className="TurnContainer">
      {enemyTurn ? (
        <div className="Turn"></div>
      ) : (
        <div className="NotMyTurn"></div>
      )}
    </div>
  );
}

export default EnemyTurn;
