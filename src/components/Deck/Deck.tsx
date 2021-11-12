import Card from "../Card/Card";
import "./Deck.css";

function Deck(props: any) {
  return (
    <div className="Deck">
      <Card number={props.playerHand[0]}></Card>
      <Card number={props.playerHand[1]}></Card>
      <Card number={props.playerHand[2]}></Card>
      <Card number={props.playerHand[3]}></Card>
    </div>
  );
}

export default Deck;
