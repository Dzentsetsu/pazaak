import Table from "../Table/Table";
import "./Game.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import EnemyRoundsWon from "../Table/EnemySide/EnemyRoundsWon/EnemyRoundsWon";
import Dealer from "../AI/Dealer/Dealer";
import EnemyScore from "../Table/EnemySide/EnemyScore/EnemyScore";
import EnemyAI, { Desicion } from "../AI/EnemyAI/EnemyAI";

export type Enemy = {
  enemyHand: Array<number>;
  enemyScore: number;
  enemyTurn: boolean;
  enemyRoundsWon: number;
  enemyCardsOnTable: any;
  computerStanded: boolean;
};

export type Player = {
  playerHand: Array<number>;
  playerScore: number;
  playerTurn: boolean;
  playerRoundsWon: number;
  playerCardsOnTable: any;
  playerStanded: boolean;
};

export type Triggers = {
  endTurnTrigger: () => void;
  standTrigger: () => void;
  forfeitGameTrigger: () => void;
};

let roundStartedDelay = false;
let playerPressedStand = false;
let enemyPressedStand = false;
let playerShouldGetCard = true;
let whoWonRound = "No one";

function Game() {
  let winner: string;

  const [roundInit, setRoundInit] = useState(false);
  const [evalEnemyStats, setEvalEnemyStats] = useState(false);
  const [evalPlayerStats, setEvalPlayerStats] = useState(false);
  const [roundWinner, setRoundWinner] = useState(false);

  const [playerHand, setPlayerHand] = useState([0, 0, 0, 0]);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerRoundsWon, setPlayerRoundsWon] = useState(0);
  const [playerCardsOnTable, setPlayerCardsOnTable] = useState<any[]>([]);
  const [playerMove, setPlayerMove] = useState(false);
  const [playerStaneded, setPlayerStanded] = useState(false);

  const [enemyScore, setEnemyScore] = useState(0);
  const [enemyHand, setEnemyHand] = useState([0, 0, 0, 0]);
  const [enemyTurn, setEnemyTurn] = useState(false);
  const [enemyRoundsWon, setEnemyRoundsWon] = useState(0);
  const [enemyCardsOnTable, setEnemyCardsOnTable] = useState<any[]>([]);
  const [computerStanded, setComputerStanded] = useState(false);

  const deck = ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"];
  const globalDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const player: Player = {
    playerHand: playerHand,
    playerScore: playerScore,
    playerTurn: playerTurn,
    playerRoundsWon: playerRoundsWon,
    playerCardsOnTable: playerCardsOnTable,
    playerStanded: playerStaneded,
  };

  const enemy: Enemy = {
    enemyHand: enemyHand,
    enemyScore: enemyScore,
    enemyTurn: enemyTurn,
    enemyRoundsWon: enemyRoundsWon,
    enemyCardsOnTable: enemyCardsOnTable,
    computerStanded: computerStanded,
  };

  const controlls: Triggers = {
    endTurnTrigger: () => {
      if (enemyPressedStand && playerShouldGetCard == false) {
        playerShouldGetCard = true;
        setPlayerMove((prev) => !prev);
      } else {
        setPlayerTurn(false);
        setEnemyTurn(true);
        computerMove();
      }
    },
    standTrigger: () => {
      playerPressedStand = true;
      setPlayerStanded(true);
      playerShouldGetCard = false;
      setPlayerMove(false);
      setPlayerTurn(false);

      if (enemyPressedStand == false) {
        computerMove();
      }
      if (enemyPressedStand) {
        playerShouldGetCard = false;
        // debugger;
        setRoundWinner((prev) => !prev);
      }
    },
    forfeitGameTrigger: () => {
      document.location.reload();
    },
  };

  useEffect(() => {
    clearState();
    setPlayerHand(Dealer.generateDeck(deck));
    playerShouldGetCard = true;
    setPlayerMove(true);
  }, [roundInit]);

  useEffect(() => {
    if (roundStartedDelay) {
      // debugger;
      if (
        (playerPressedStand && enemyPressedStand) ||
        (playerPressedStand && enemyPressedStand == false)
      ) {
        if (playerScore === enemyScore) {
          console.log("TIE");
          // debugger;
        } else if (playerScore < enemyScore) {
          setEnemyRoundsWon((prev) => prev + 1);
          whoWonRound = "Enemy";
          // debugger;
        } else if (playerScore > enemyScore) {
          setPlayerRoundsWon((prev) => prev + 1);
          whoWonRound = "Player";
          // debugger;
        }
      }

      if (playerRoundsWon == 2 && whoWonRound == "Player") {
        setPlayerRoundsWon((prev) => prev + 1);
        gameOver("Player");
      } else if (enemyRoundsWon == 2 && whoWonRound == "Enemy") {
        setEnemyRoundsWon((prev) => prev + 1);
        gameOver("Enemy");
      } else {
        alert(`${whoWonRound} - won this round!`);
        setRoundInit((prev) => !prev);
        console.log("continue battle");
      }
    }
  }, [roundWinner]);

  useEffect(() => {
    setPlayerTurn(true);
    if (enemyPressedStand && playerPressedStand) {
      setRoundWinner((prev) => !prev);
      return;
    } else if (
      enemyPressedStand &&
      playerPressedStand == false &&
      playerShouldGetCard
    ) {
      dealCardWhenComputerStanded();
      playerShouldGetCard = false;
    } else if (
      enemyPressedStand &&
      playerPressedStand == false &&
      playerShouldGetCard == false
    ) {
      console.log("do nothing");
      // debugger;
    }
    if (playerMove && playerShouldGetCard) {
      dealCardToPlayer(1300);
    }
    roundStartedDelay = true;
  }, [playerMove]);

  useEffect(() => {
    if (playerPressedStand && enemyPressedStand) {
      setRoundWinner((prev) => !prev);
      return;
    }
    if (playerPressedStand && enemyScore >= 21) {
      if (playerRoundsWon == 2) {
        setPlayerRoundsWon((prev) => prev + 1);
        gameOver("Player");
        return;
      }
      setPlayerRoundsWon((prev) => prev + 1);
      alert("Player won this round");
      setRoundInit((prev) => !prev);
      return;
    }
    if (playerPressedStand) {
      setPlayerTurn(false);

      // debugger;
      switch (EnemyAI.modeEasy(playerScore, enemyScore)) {
        case Desicion.DEAL:
          {
            // debugger;
            computerMove();
          }
          break;
        case Desicion.STAND:
          {
            enemyPressedStand = true;
            setComputerStanded(true);
            // debugger;
            setRoundWinner((prev) => !prev);
          }
          break;
        default: {
          // debugger;
        }
      }
    }

    if (enemyScore <= 20 && enemyScore >= 18) {
      enemyPressedStand = true;
      setComputerStanded(true);
      setEnemyTurn(false);

      if (playerPressedStand == false) {
        setPlayerMove((prev) => !prev);
      }
      // if playerStanded before
    } else if (enemyScore >= 21) {
      if (playerRoundsWon == 2) {
        setPlayerRoundsWon((prev) => prev + 1);
        gameOver("Player");
      } else {
        setPlayerRoundsWon((prev) => prev + 1);
        alert("Player won this round!");
        // debugger;
        setRoundInit((prev) => !prev);
      }
      return;
      // lost round / game
    } else {
      if (playerPressedStand == false) {
        setPlayerTurn(true);
        setEnemyTurn(false);
        setPlayerMove(true);
      }
      // nothing happened yet
    }
  }, [evalEnemyStats]);

  useEffect(() => {
    if (enemyPressedStand && playerPressedStand) {
      setRoundWinner((prev) => !prev);
      return;
    }

    if (playerScore === 20) {
      playerPressedStand = true;
      controlls.standTrigger();
    } else if (playerScore >= 21) {
      if (enemyRoundsWon == 2) {
        setEnemyRoundsWon((prev) => prev + 1);
        gameOver("Enemy");
      } else {
        setEnemyRoundsWon((prev) => prev + 1);
        alert("Enemy won this round!");
        // debugger;
        setRoundInit((prev) => !prev);
        return;
      }
    } else {
      // nothing happened yet
    }

    if (enemyPressedStand && playerShouldGetCard) {
      setPlayerMove(true);
    }
  }, [evalPlayerStats]);

  function computerMove() {
    setEnemyTurn(true);
    if (playerPressedStand) {
      whatToDoWhenPlayerStanded(1300);
    }

    if (playerPressedStand == false) {
      dealCardToEnemy(1300);
    }
  }

  function gameOver(whoWon: string = "") {
    setEnemyTurn(false);
    setPlayerTurn(false);
    // window.confirm(`Game over. Winner - ${whoWon}. Press OK to reload`) &&
    //   document.location.reload();
    alert(`Game over. Winner - ${whoWon}`);
  }

  function clearState() {
    roundStartedDelay = false;
    playerPressedStand = false;
    enemyPressedStand = false;
    playerShouldGetCard = true;
    whoWonRound = "No one";

    setEnemyCardsOnTable([]);
    setEnemyHand([]);
    setEnemyScore(0);
    setEnemyTurn(false);
    setPlayerCardsOnTable([]);
    setPlayerHand([]);
    setPlayerMove(false);
    setPlayerScore(0);
    setPlayerTurn(true);
    setPlayerStanded(false);
    setComputerStanded(false);
  }
  function randomCardFromGlobalDeck() {
    return globalDeck[Math.ceil(Math.random() * globalDeck.length - 1)];
  }
  function dealCardToPlayer(timeout: number = 1300) {
    let number = Dealer.playCard();
    setTimeout(() => {
      setPlayerCardsOnTable((oldState) => [...oldState, number]);
      setPlayerScore((prevScore) => prevScore + number);

      setPlayerMove(false);
      setTimeout(() => {
        setEvalPlayerStats((prev) => !prev);
      }, 30);
    }, timeout);
  }

  function dealCardWhenComputerStanded() {
    let number = Dealer.playCard();
    setTimeout(() => {
      setPlayerCardsOnTable((oldState) => [...oldState, number]);
      setPlayerScore((prevScore) => prevScore + number);
      setEvalPlayerStats((prev) => !prev);
    }, 1300);
  }

  function whatToDoWhenPlayerStanded(timeout: number = 1300) {
    let number = Dealer.playCard();
    setTimeout(() => {
      setEnemyCardsOnTable((oldState) => [...oldState, number]);
      setEnemyScore((prevScore) => prevScore + number);

      setEvalEnemyStats((prev) => !prev);
    }, timeout);
  }

  function dealCardToEnemy(timeout: number = 1300) {
    setEnemyTurn(true);
    let number = Dealer.playCard();
    setTimeout(() => {
      setEnemyCardsOnTable((oldState) => [...oldState, number]);
      setEnemyScore((prevScore) => prevScore + number);

      setEvalEnemyStats((prev) => !prev);
    }, timeout);
  }
  return (
    <div className="Game">
      <Table player={player} enemy={enemy} controlls={controlls} />
    </div>
  );
}
export default Game;
