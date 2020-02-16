import React from "react";
import ReactDOM from "react-dom";
import Card from "/components/card";
import Heart from "/components/heart";
import Modal from "/components/modal";

import "./style.scss";

const MAX_TRIES = 3;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardsNumber: 5,
      tries: MAX_TRIES,
      maxTries: MAX_TRIES,
      cardsFlipped: [],
      cards: [],
      score: 0,
      showModal: false,
      round: 1,
      result: ""
    };

    this.shuffleCards = this.shuffleCards.bind(this);
    this.createCards = this.createCards.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  componentDidMount() {
    if (this.state.cards.length === 0) {
      this.setState({ cards: this.shuffleCards() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length === 0 && this.state.cards.length > 0) {
      this.startGame();
    }
  }

  startGame() {
    let addNumber;
    if (this.state.round > 1) {
      addNumber = 2500;
      setTimeout(() => this.centralizeCards(false), 2500);
      setTimeout(() => this.setState({ cards: this.shuffleCards() }), 3000);
    }
    if (this.state.round === 1) {
      addNumber = 0;
    }
    setTimeout(() => this.flipAllCards(), addNumber + 1000);
    setTimeout(() => {
      this.flipAllCards();
      this.setAllCardsDisable(false);
    }, 8500);
  }

  centralizeCards(value) {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.state.cards[i].isCentralized = value;
    }
    this.setState({ cards: this.state.cards });
  }

  flipAllCards() {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.flipCard(i);
    }
  }

  setAllCardsDisable(value) {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.state.cards[i].isDisabled = value;
    }
    this.setState({ cards: this.state.cards });
  }

  shuffleCards() {
    let cardsArray = this.createCards();
    let shuffledArray = [];
    let i;
    let n = cardsArray.length;
    while (n) {
      i = Math.floor(Math.random() * cardsArray.length);
      if (i in cardsArray) {
        shuffledArray.push(cardsArray[i]);
        delete cardsArray[i];
        n--;
      }
    }
    return shuffledArray;
  }

  flipCard(index) {
    this.state.cards[index].isFlipped = !this.state.cards[index].isFlipped;
    this.setState({ cards: this.state.cards });
  }
  onCardClick(index) {
    let cardsFlipped = this.state.cardsFlipped;
    this.flipCard(index);
    cardsFlipped.push({
      index: index,
      card: this.state.cards[index].card
    });

    if (cardsFlipped.length === 2) {
      if (cardsFlipped[0].card === cardsFlipped[1].card) {
        this.state.score++;
        if (this.state.score === this.state.cardsNumber) {
          this.setState({ showModal: true, result: "won" });
        }
      } else {
        setTimeout(() => {
          this.flipCard(cardsFlipped[0].index);
          this.flipCard(cardsFlipped[1].index);
        }, 1000);
        this.state.tries--;
        if (this.state.tries === 0) {
          this.setAllCardsDisable(true);
          this.setState({ showModal: true, result: "lost" });
        }
      }
      this.setState({ cardsFlipped: [] });
    }
  }

  playAgain() {
    this.setState({
      cardsNumber: 5,
      tries: MAX_TRIES,
      maxTries: MAX_TRIES,
      cardsFlipped: [],
      score: 0,
      showModal: false,
      result: ""
    });

    this.state.round += 1;
    let newRoundCards = this.state.cards;

    for (let i = 0; i < this.state.cards.length; i++) {
      newRoundCards[i].isFlipped = false;
      newRoundCards[i].isDisabled = true;
    }

    setTimeout(() => this.centralizeCards(true), 1000);
    this.setState({ cards: newRoundCards });
    this.startGame();
  }

  createCards() {
    let cardsArray = [];
    for (let i = 0; i < this.state.cardsNumber; i++) {
      cardsArray.push({
        card: i,
        isFlipped: false,
        isDisabled: true,
        isCentralized: false
      });
      cardsArray.push({
        card: i,
        isFlipped: false,
        isDisabled: true,
        isCentralized: false
      });
    }
    return cardsArray;
  }

  createHearts() {
    let hearts = [];
    for (let i = 0; i < this.state.maxTries; i++) {
      hearts.push(
        <Heart key={i} isCrossed={this.state.maxTries - i > this.state.tries} />
      );
    }
    return hearts;
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < this.state.cards.length; i++) {
      board.push(
        <Card
          key={i}
          number={this.state.cards[i].card}
          onCardClick={this.onCardClick}
          index={i}
          isFlipped={this.state.cards[i].isFlipped}
          isDisabled={this.state.cards[i].isDisabled}
          isCentralized={this.state.cards[i].isCentralized}
        />
      );
    }
    return board;
  }

  render() {
    return (
      <div className="game">
        <div className="hearts">{this.createHearts()}</div>
        {this.state.showModal ? (
          <div id="modal">
            <Modal result={this.state.result} playAgain={this.playAgain} />
          </div>
        ) : null}
        <div className="board">{this.createBoard()}</div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
