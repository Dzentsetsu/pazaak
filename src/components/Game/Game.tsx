import "./Game.css";
import "./UpperTable.css";
import "./PlayerButtons.css";
import UpperTable from "./PlayerSide/UpperTable";
import LowerTable from "./PlayerSide/PlayerHand/LowerTable";

import EnemyUpperTable from "./EnemySide/EnemyUpperTable";
import "./EnemyLowerTable.css";
import EnemyWhosHand from "./EnemyWhosHand";
import EnemyDeck from "../EnemyDeck/EnemyDeck";

import { useEffect, useRef, useReducer, SyntheticEvent, useState } from "react";
import Dealer from "../../helpers/dealer";
import EnemyAI, { Desicion } from "../../helpers/enemyAI";
import Modal from "../Modal/Modal";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const UI_UPDATE_TIMEOUT = 400;

type Triggers = {
  endTurnTrigger: () => void;
  standTrigger: () => void;
  forfeitGameTrigger: () => void;
};

export interface GameState {
  global: {
    initNewRound: boolean;
    doNotExeptUserInput: boolean;
    passTurnToPlayer: boolean;
    toogleAIturn: boolean;
    deck: Array<string>;
    winner: String;
  };
  player: {
    hand: Array<number>;
    turn: boolean;
    score: number;
    roundsWon: number;
    cardsOnTable: Array<number>;
    standed: boolean;
    handUsed: boolean;
  };
  ai: {
    hand: Array<number>;
    turn: boolean;
    score: number;
    roundsWon: number;
    cardsOnTable: Array<number>;
    standed: boolean;
    handUsed: boolean;
  };
  modal: {
    isOpen: boolean;
    message: String;
  };
}

export enum ACTION {
  EVAL,
  INIT_GAME,
  INIT_ROUND,
  AI_TURN,
  AI_MOVE,
  PLAYER_TURN,
  PLAYER_MOVE,
  ROUND_WINNER,
  PLAYER_STAND,
  AI_STAND,
  GAME_WINNER,
  PLAY_CARD_FROM_HAND,
  DISABLE_INPUT,
  PLAYER_WON_ROUND,
  AI_WON_ROUND,
  PLAYRE_WON_GAME,
  AI_WON_GAME,
  CLOSE_MODAL,
  TIE,
  TOOGLE_AI,
  CONTINUE,
}

const initialState: GameState = {
  global: {
    initNewRound: false,
    doNotExeptUserInput: false,
    passTurnToPlayer: false,
    toogleAIturn: false,
    deck: ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"],
    winner: "",
  },
  player: {
    hand: [],
    turn: false,
    score: 0,
    roundsWon: 0,
    cardsOnTable: [],
    standed: false,
    handUsed: false,
  },
  ai: {
    hand: [],
    turn: false,
    score: 0,
    roundsWon: 0,
    cardsOnTable: [],
    standed: false,
    handUsed: false,
  },
  modal: {
    isOpen: false,
    message: "Вы выйграли сет",
  },
};

const reducer = (state: GameState, action: any) => {
  switch (action.type) {
    // @ts-ignore
    case ACTION.INIT_GAME: {
      // start background music
      state.ai.roundsWon = 0;
      state.player.roundsWon = 0;
    }
    case ACTION.INIT_ROUND: {
      // clear state excluding roundsWON on both sides
      let tempPlayerRoundsWon = state.player.roundsWon;
      let tempAIRoundsWon = state.ai.roundsWon;

      state = JSON.parse(JSON.stringify(initialState));

      state.player.roundsWon = tempPlayerRoundsWon;
      state.ai.roundsWon = tempAIRoundsWon;

      state.player.hand = Dealer.generateDeck(state.global.deck).splice(0, 4);
      state.ai.hand = Dealer.generateDeck(state.global.deck).splice(0, 4);
      Dealer.dealCard(state.player);
      state.player.turn = true;

      break;
    }
    case ACTION.AI_TURN: {
      // state.global.doNotExeptUserInput = true;
      state.player.turn = false;
      state.ai.turn = true;
      state.global.toogleAIturn = !state.global.toogleAIturn;
      return { ...state };
    }
    case ACTION.AI_MOVE: {
      if (!state.ai.standed) {
        Dealer.dealCard(state.ai);

        let ai_decision = EnemyAI.modeEasy(
          state.player.score,
          state.ai.score,
          state.player.standed
        );

        if (ai_decision === Desicion.STAND) {
          console.log("AI STANDED");
          state.ai.standed = true;
          state.ai.turn = false;
          if (!state.player.standed) {
            state.global.passTurnToPlayer = true;
            state.global.doNotExeptUserInput = false;
            state.player.handUsed = false;
            state.player.turn = true;
          }
          return { ...state };
        }

        if (!state.player.standed) {
          state.global.passTurnToPlayer = true;
          state.global.doNotExeptUserInput = false;
          state.player.handUsed = false;
          state.player.turn = true;
        }
      }
      return { ...state };
    }
    case ACTION.TOOGLE_AI: {
      state.global.toogleAIturn = !state.global.toogleAIturn;
      break;
    }
    case ACTION.PLAYER_TURN: {
      state.global.passTurnToPlayer = false;
      state.ai.turn = false;
      state.player.turn = true;
      Dealer.dealCard(state.player);

      break;
    }
    case ACTION.PLAYER_STAND: {
      state.player.standed = true;
      state.global.doNotExeptUserInput = true;
      state.player.turn = false;
      state.ai.turn = true;
      if (!state.ai.standed) {
        state.global.toogleAIturn = !state.global.toogleAIturn;
      }
      break;
    }
    case ACTION.AI_STAND: {
      state.ai.standed = true;
      state.ai.turn = false;
      break;
    }
    case ACTION.PLAY_CARD_FROM_HAND: {
      if (!state.player.handUsed) {
        Dealer.putCardOnTableFromHand(state.player, action.payload);
        state.player.handUsed = true;
      }
      break;
    }
    case ACTION.DISABLE_INPUT: {
      // state.global.doNotExeptUserInput = true;
      return { ...state };
    }
    case ACTION.CLOSE_MODAL: {
      // if (
      //   state.modal.message === "Вы выйграли раунд" ||
      //   state.modal.message === "Вы проиграли раунд"
      // ) {
      state.global.initNewRound = true;
      state.modal.isOpen = false;
      // }
      break;
    }
    case ACTION.PLAYER_WON_ROUND: {
      state.player.roundsWon += 1;
      state.modal.isOpen = true;
      state.modal.message = "Вы выйграли раунд";
      break;
    }
    case ACTION.AI_WON_ROUND: {
      state.ai.roundsWon += 1;
      state.modal.isOpen = true;
      state.modal.message = "Вы проиграли раунд";
      break;
    }

    case ACTION.PLAYRE_WON_GAME: {
      state.player.roundsWon += 1;
      state.modal.isOpen = true;

      state.modal.message = "Вы выйграли!";
      break;
    }
    case ACTION.AI_WON_GAME: {
      state.ai.roundsWon += 1;
      state.modal.isOpen = true;
      state.modal.message = "Вы проиграли";
      break;
    }
    case ACTION.TIE: {
      state.modal.isOpen = true;
      state.modal.message = "НИЧЬЯ";
      break;
    }
    case ACTION.CONTINUE: {
      return { ...state };
    }
    default:
      console.log("You should not see this");
      return { ...state };
  }

  return { ...state };
};

function Game() {
  const selfRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));

  // const deck = ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"];
  // const globalDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const controlls: Triggers = {
    endTurnTrigger: () => {
      if (!state.ai.standed) dispatch({ type: ACTION.AI_TURN });

      if (state.ai.standed && !state.player.standed) {
        dispatch({ type: ACTION.PLAYER_TURN });
      }
    },
    standTrigger: () => {
      dispatch({ type: ACTION.PLAYER_STAND });
    },
    forfeitGameTrigger: () => {
      document.location.reload();
    },
  };

  // ЗАмена старых юзеффектов на новый с применением диспатча
  useEffect(() => {
    if (state.global.initNewRound) {
      setTimeout(() => {
        dispatch({ type: ACTION.INIT_ROUND });
      }, UI_UPDATE_TIMEOUT);
      return;
    }
    dispatch({ type: ACTION.INIT_ROUND });
  }, [state.global.initNewRound]);

  useEffect(() => {
    if (state.global.passTurnToPlayer) {
      setTimeout(() => {
        dispatch({ type: ACTION.PLAYER_TURN });
      }, UI_UPDATE_TIMEOUT);
    }
  }, [state.global.passTurnToPlayer]);

  useEffect(() => {
    if (state.ai.turn && !state.ai.standed) {
      setTimeout(() => {
        dispatch({ type: ACTION.AI_MOVE });
      }, UI_UPDATE_TIMEOUT);
    }
  }, [state.global.toogleAIturn]);

  useEffect(() => {
    let decision = Dealer.eval(state.player, state.ai);
    dispatch({ type: decision });
    return;
  }, [state.player.score, state.ai.score, state.player.standed, state.ai.standed]);

  // ЗАмена старых юзеффектов на новый с применением диспатча
  const userInputHandler = (e: SyntheticEvent) => {
    if (!state.global.doNotExeptUserInput) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="Game" onClick={userInputHandler} ref={selfRef}>
      <div className="Table">
        <div className="PlayerSide">
          <UpperTable
            score={state.player.score}
            turn={state.player.turn}
            roundsWon={state.player.roundsWon}
            cardsOnTable={state.player.cardsOnTable}
          />
          <LowerTable
            playerHand={state.player.hand}
            playCard={(rank: number, index: number) => {
              dispatch({
                type: ACTION.PLAY_CARD_FROM_HAND,
                payload: {
                  rank: rank,
                  index: index,
                },
              });
            }}
          />
          {state.player.standed && <div className="Darkened">&nbsp;</div>}
        </div>
        <div className="EnemySide">
          <EnemyUpperTable
            enemyScore={state.ai.score}
            enemyTurn={state.ai.turn}
            enemyRoundsWon={state.ai.roundsWon}
            enemyCardsOnTable={state.ai.cardsOnTable}
            computerStanded={state.ai.standed}
          />
          <div className="EnemyLowerTable">
            <EnemyWhosHand />
            <EnemyDeck />
            <div className="PlayerButtons">
              <button
                className="EndTurn"
                onClick={controlls.endTurnTrigger}
                disabled={state.global.doNotExeptUserInput}
              >
                Закончить ход
              </button>
              <button
                className="Stand"
                onClick={controlls.standTrigger}
                disabled={state.global.doNotExeptUserInput}
              >
                Пас
              </button>
              <button className="Forfeit" onClick={controlls.forfeitGameTrigger}>
                Сдаться
              </button>
            </div>
          </div>
        </div>
      </div>
      {state.modal.isOpen && (
        <Modal show={state.modal.isOpen} dispatch={dispatch} modalMessage={state.modal.message} />
      )}
    </div>
  );
}

export default Game;
