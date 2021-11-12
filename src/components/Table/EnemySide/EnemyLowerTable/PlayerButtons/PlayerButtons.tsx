import "./PlayerButtons.css";

function PlayerButtons({ controlls }: any) {
  const {
    standTrigger: stand,
    endTurnTrigger: endTurn,
    forfeitGameTrigger: forfeit,
  } = controlls;
  return (
    <div className="PlayerButtons">
      <button className="EndTurn" onClick={endTurn}>
        END Turn
      </button>
      <button className="Stand" onClick={stand}>
        Stand
      </button>
      <button className="Forfeit" onClick={forfeit}>
        Forfeit Game
      </button>
    </div>
  );
}

export default PlayerButtons;
