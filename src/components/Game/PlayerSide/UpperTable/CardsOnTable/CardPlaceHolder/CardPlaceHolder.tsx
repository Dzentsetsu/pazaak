import "./CardPlaceHolder.css";
import card from "../../../../../../assets/img/placeHolder.png";

function CardPlaceHolder() {
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

export default CardPlaceHolder;
