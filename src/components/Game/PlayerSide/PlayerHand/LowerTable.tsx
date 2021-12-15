import "./LowerTable.css";
import Deck from "../../../Deck/Deck";
import Capabilities from "./Capabilities/Capabilities";
import WhosHand from "./Capabilities/WhosHand";
import React from "react";
export default React.memo(function LowerTable({ playerHand, playCard }: { playerHand: any[]; playCard: Function }) {
  return (
    <div className="LowerTable">
      <WhosHand />
      <Deck playerHand={playerHand} playCard={playCard} />
      <Capabilities />
    </div>
  );
});
