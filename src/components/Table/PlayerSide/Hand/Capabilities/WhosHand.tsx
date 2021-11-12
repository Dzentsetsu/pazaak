import "./WhosHand";

import { CSSProperties } from "react";

function WhosHand() {
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
    <div className="WhosHand" style={styles}>
      My hand
    </div>
  );
}

export default WhosHand;
