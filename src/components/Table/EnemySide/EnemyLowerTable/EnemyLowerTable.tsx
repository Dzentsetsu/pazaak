import "./EnemyLowerTable.css";
import EnemyWhosHand from "./PlayerButtons/EnemyWhosHand";
import EnemyDeck from "../../../EnemyDeck/EnemyDeck";
import PlayerButtons from "./PlayerButtons/PlayerButtons";
function EnemyLowerTable(props: any) {
  const { controlls } = props;
  return (
    <div className="EnemyLowerTable">
      <EnemyWhosHand />
      <EnemyDeck />
      <PlayerButtons controlls={controlls} />
    </div>
  );
}

export default EnemyLowerTable;
