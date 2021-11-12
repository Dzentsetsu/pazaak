import EnemyLowerTable from "./EnemyLowerTable/EnemyLowerTable";
import "./EnemySide.css";
import EnemyUpperTable from "./EnemyUpperTable";

function EnemySide(props: any) {
  const { computerStanded } = props.enemy;
  return (
    <div className="EnemySide">
      <EnemyUpperTable {...props} />
      <EnemyLowerTable {...props} />
      {computerStanded && <div className="Darkened">&nbsp;</div>}
    </div>
  );
}

export default EnemySide;
