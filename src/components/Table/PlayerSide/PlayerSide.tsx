import "./PlayerSide.css";
import LowerTable from "./Hand/LowerTable";
import UpperTable from "./UpperTable/UpperTable";

function PlayerSide(props: any) {
  const { playerStanded } = props.player;

  // console.log(playerStanded);

  return (
    <div className="PlayerSide">
      <UpperTable {...props} />
      <LowerTable {...props} />
      {playerStanded && <div className="Darkened">&nbsp;</div>}
    </div>
  );
}

export default PlayerSide;
