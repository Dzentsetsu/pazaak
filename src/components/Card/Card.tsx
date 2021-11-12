import "./Card.css";
import card from "../../assets/img/card2.png";

function Card(props: any) {
  const { number } = props;
  return (
    <div className="Card">
      <img src={card} alt="" height={110} width={78} />
      <p>{number}</p>
    </div>
  );
}

export default Card;
