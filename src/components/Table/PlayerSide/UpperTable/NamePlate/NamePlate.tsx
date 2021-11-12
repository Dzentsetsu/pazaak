import "./NamePlate.css";
import React from "react";

export default React.memo(function NamePlate() {
  return (
    <div className="NamePlate">
      {window.localStorage.getItem("name") || "Jabba The Hutt"}
    </div>
  );
});
