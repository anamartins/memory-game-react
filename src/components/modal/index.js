import React from "react";
import "./style.scss";
import PropTypes from "prop-types";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.result;
    let className;
    let message;
    if (result === "lost") {
      className = "lost";
      message = ". :(";
    } else if (result === "won") {
      className = "won";
      message = "! :D";
    }

    return (
      <div className={className}>
        <p>
          You {className}
          {message}
        </p>
        <button onClick={this.props.playAgain}>Play again</button>
      </div>
    );
  }
}

Modal.propTypes = {
  result: PropTypes.string,
  playAgain: PropTypes.func
};

export default Modal;
