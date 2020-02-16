import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      index: null,
      card: null,
      isPaired: false,
      position: null
    };
    this.divCard = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.getCardPosition = this.getCardPosition.bind(this);
  }

  onClick() {
    if (!this.props.isFlipped && !this.props.isDisabled) {
      this.props.onCardClick(this.props.index);
    }
  }

  getCardPosition() {
    if (this.state.position !== null) return;
    let container = document.querySelector(".board");
    let containerPos = container.getBoundingClientRect();
    let rect = this.divCard.current.getBoundingClientRect();
    let margin = window
      .getComputedStyle(this.divCard.current)
      .getPropertyValue("margin");
    margin.slice(-2);
    margin = parseInt(margin);
    let position = {
      top: rect.y - containerPos.top - margin,
      left: rect.x - containerPos.left - margin,
      width: rect.width,
      height: rect.height
    };
    this.divCard.current.style.left = position.left + "px";
    this.divCard.current.style.top = position.top + "px";
    this.setState({ position: position });
  }

  componentDidUpdate(prevProps) {
    let container = document.querySelector(".board");
    let containerPosition = container.getBoundingClientRect();
    if (
      prevProps.isCentralized !== this.props.isCentralized &&
      this.props.isCentralized
    ) {
      this.divCard.current.style.position = "absolute";
      this.divCard.current.style.left =
        window.innerWidth / 2 -
        this.state.position.width / 2 -
        containerPosition.left +
        "px";
      this.divCard.current.style.top =
        window.innerHeight / 2 -
        this.state.position.height / 2 -
        containerPosition.top +
        "px";
    }
    if (
      prevProps.isCentralized !== this.props.isCentralized &&
      !this.props.isCentralized
    ) {
      this.divCard.current.style.left = this.state.position.left + "px";
      this.divCard.current.style.top = this.state.position.top + "px";
    }
  }

  render() {
    let { number } = this.props;
    let { isFlipped } = this.props;
    return (
      <div
        className="card"
        data-number={number}
        onClick={this.onClick}
        ref={this.divCard}
      >
        <div className={`spin ${isFlipped ? "spin-click" : ""}`}>
          <div className="card-front">
            <img
              src={`./img/card-${number}.svg`}
              onLoad={this.getCardPosition}
            />
          </div>
          <div className="card-back">
            <img src="./img/back.svg" />
          </div>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  number: PropTypes.number,
  index: PropTypes.number,
  onCardClick: PropTypes.func,
  isFlipped: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isCentralized: PropTypes.bool
};
export default Card;
