import "./EnemyCardPlaceHolder.css";
import card from "../../../../../assets/img/placeHolder.png";

function EnemyCardPlaceHolder() {
  const cardHeight = "110px";
  const cardWidth = "78px";

  return (
    <img
      className="CardPlaceHolder"
      src={card}
      alt=""
      height={cardHeight}
      width={cardWidth}
    />
  );
}

export default EnemyCardPlaceHolder;
