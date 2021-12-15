import "./Card.css";
import card from "../../assets/img/card2.png";
import { SyntheticEvent, useRef } from "react";

function Card(props: any) {
  const { number, index } = props;
  const onClickHandler = (e: SyntheticEvent) => {
    props.playCard(number, index);
  };

  return (
    <div className="Card" onClick={onClickHandler}>
      <img src={card} alt="" height={110} width={78} />
      <p>{number}</p>
    </div>
  );
}

export default Card;
