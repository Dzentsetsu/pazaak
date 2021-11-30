const Dealer = {
  playCard: () => Math.floor(Math.random() * (11 - 1) + 1),
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
  
};
export default Dealer;
