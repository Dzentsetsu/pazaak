import { GameState } from "../components/Game/Game";
import { ACTION } from "../components/Game/Game";

const Dealer = {
  generateCard: () => Math.floor(Math.random() * (11 - 1) + 1),
  generateDeck: (deck: string[]) => {
    let t, i;
    let l = deck.length;

    while (l) {
      i = Math.floor(Math.random() * l--);

      t = deck[l];
      deck[l] = deck[i];
      deck[i] = t;
    }

    let arr = deck.map((str) => +str);
    return arr;
  },
  dealCard(target: GameState["player"] | GameState["ai"], timeout: number = 100): number {
    const number = Dealer.generateCard();
    target.cardsOnTable = [...target.cardsOnTable, number];
    target.score += number;
    return target.score + number;
  },
  putCardOnTableFromHand(
    target: GameState["player"] | GameState["ai"],
    payload: { rank: number; index: number }
  ) {
    target.hand.splice(payload.index, 1, 0);
    target.cardsOnTable.push(payload.rank);
    target.score += payload.rank;
    console.log(target.cardsOnTable);
  },
  eval(player: GameState["player"], ai: GameState["ai"]) {
    if (player.score >= 21) return ACTION.AI_WON_ROUND;
    if (ai.score >= 21) return ACTION.PLAYER_WON_ROUND;

    if (player.standed && !ai.standed && ai.score <= 21) {
      return ACTION.TOOGLE_AI;
    }

    if (player.standed && ai.standed) {
      if (player.roundsWon === 2 && player.score > ai.score) return ACTION.PLAYRE_WON_GAME;
      if (ai.roundsWon === 2 && ai.score > player.score) return ACTION.AI_WON_GAME;

      if (player.score > ai.score) return ACTION.PLAYER_WON_ROUND;
      if (ai.score > player.score) return ACTION.AI_WON_ROUND;
      if (player.score === ai.score) return ACTION.TIE;
    }

    if (player.roundsWon === 2 && ai.score >= 21) return ACTION.PLAYRE_WON_GAME;
    if (ai.roundsWon === 2 && player.score >= 21) return ACTION.AI_WON_GAME;
    if (!player.standed && player.score === 20) return ACTION.PLAYER_STAND;
    if (!ai.standed && ai.score === 20) return ACTION.AI_STAND;

    return ACTION.CONTINUE;
  },
};
export default Dealer;
