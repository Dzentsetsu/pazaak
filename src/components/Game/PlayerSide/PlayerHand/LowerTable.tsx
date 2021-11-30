import "./LowerTable.css";
import Deck from "../../../Deck/Deck";
import Capabilities from "./Capabilities/Capabilities";
import WhosHand from "./Capabilities/WhosHand";
import React from "react";
export default React.memo(function LowerTable({
  playerHand,
}: {
  playerHand: any[];
}) {
  return (
    <div className="LowerTable">
      <WhosHand />
      <Deck playerHand={playerHand} />
      <Capabilities />
    </div>
  );
});
