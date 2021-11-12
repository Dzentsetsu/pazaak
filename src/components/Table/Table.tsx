import EnemySide from "./EnemySide/EnemySide";
import PlayerSide from "./PlayerSide/PlayerSide";
import "./Table.css";

function Table(props: any) {
  // console.log("From Table.tsx");
  const second = {
    background: "#9df5a3",
  };

  return (
    <div className="Table">
      <PlayerSide {...props} />
      <EnemySide {...props} />
    </div>
  );
}

export default Table;
