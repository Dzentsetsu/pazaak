export enum Desicion {
    DEAL = 0,
    STAND = 1,
    PLAYCARD = 2,
}

const EnemyAI = {
    makeDecisionWhenPlayerStanded: (playerScore: number, computerScore: number, computerHand: number[]) => {
        // Make desicion based on enemyScore and cards computer has on the hand 
        if(playerScore === 20) {
            // this.playerHas20(playerScore, computerScore, computerHand);
        } else if(playerScore < 20 && playerScore >= 17) {

        } else if(playerScore < 17 && playerScore >= 13) {

        } else if(playerScore < 13) {

        } else {

        }
    },
    modeEasy: (playerScore: number, computerScore: number) => {
       if(playerScore <= 10 && playerScore > computerScore) return Desicion.DEAL;
       return playerScore < computerScore ? Desicion.STAND : 
              playerScore === computerScore ?  Desicion.STAND : 
              playerScore > computerScore ?  Desicion.DEAL : Desicion.DEAL;
    },
    playerHas20: (computerScore: number, computerHand: number[]): number=> {
        if (computerScore <= 10) {
            return Desicion.DEAL;
        } else if(computerScore >= 11 && computerScore <= 14) {
            return computerHand.indexOf(6) == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
        } 
        else if (computerScore === 15 || computerScore === 16) {
            const has5 = computerHand.indexOf(5);
            const has4 = computerHand.indexOf(4);

            if(computerScore === 15) {
                return has5 == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
            } else {
                return has4 == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
            }
        }  
        else if(computerScore === 17 || computerScore === 18) {
            const has3 = computerHand.indexOf(3);
            const has2 = computerHand.indexOf(2);

            if(computerScore === 17) {
                return has3 == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
            } else {
                return has2 == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
            }
         }
         else if(computerScore === 19) {
             return computerHand.indexOf(1) == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
         } else {
             debugger;
             return Desicion.STAND;
         }
         return Desicion.STAND;
    },
    playerHas19_17: (playerScore:number, computerScore: number, computerHand: number[])=>{
        if (computerScore <= 10) {
            return Desicion.DEAL;
        } else if(computerScore >= 11 && computerScore <= 14) {
          return  computerHand.indexOf(6) == -1 ? Desicion.DEAL : Desicion.PLAYCARD;
        } else if (computerScore === 15 || computerScore === 16) {
            const has5 = computerHand.indexOf(5);
            const has4 = computerHand.indexOf(4);

            if((playerScore === 17 || playerScore === 18) && computerScore === 15) {
                return (has5 != -1) || (has4 != -1) ? Desicion.PLAYCARD : Desicion.DEAL;
            }
            if(playerScore === 19 && computerScore === 15) {
                return (has5 != -1 || has4 != -1 ) ? Desicion.PLAYCARD : Desicion.DEAL;
            }
            if(playerScore === 19 && computerScore === 16) {
                return has4 != -1  ? Desicion.PLAYCARD : Desicion.DEAL;
            }
    
        } else if(computerScore === 17 || computerScore === 18 || computerScore === 19) {
            const has3 = computerHand.indexOf(3);
            const has2 = computerHand.indexOf(2);
            const has1 = computerHand.indexOf(1);
            
            if(playerScore === 19 && computerScore == 19) return has1 != -1 ? Desicion.PLAYCARD : Desicion.STAND;
            if(playerScore === 19 && computerScore == 18) return (has2 != -1 || has1 != -1) ? Desicion.PLAYCARD : Desicion.DEAL;
            if(playerScore === 19 && computerScore == 17) return  has3 != -1 ? Desicion.PLAYCARD : Desicion.DEAL;
            if(playerScore === 18 && computerScore == 17) return (has3 != -1 || has2 != -1) ? Desicion.PLAYCARD : Desicion.DEAL;
            if(playerScore === 17 && computerScore >= 18) return Desicion.STAND;
        }
        return Desicion.DEAL;
    },
}

export default EnemyAI;