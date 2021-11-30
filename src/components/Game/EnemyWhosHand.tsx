import "./EnemyWhosHand";
import React from "react";
import { CSSProperties } from "react";

export default React.memo(function EnemyWhosHand() {
  const styles: CSSProperties = {
    background: "black",
    height: "30px",
    color: "white",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    textAlign: "center",
    lineHeight: "30px",
  };
  return (
    <div className="EnemyWhosHand" style={styles}>
      EnemyHand
    </div>
  );
});
