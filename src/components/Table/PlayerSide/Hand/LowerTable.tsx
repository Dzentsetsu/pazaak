import "./LowerTable.css";
import Deck from "../../../Deck/Deck";
import Capabilities from "./Capabilities/Capabilities";
import WhosHand from "./Capabilities/WhosHand";
function LowerTable(props: any) {
  const { player } = props;
  return (
    <div className="LowerTable">
      <WhosHand />
      <Deck playerHand={player.playerHand} />
      <Capabilities />
    </div>
  );
}

export default LowerTable;
