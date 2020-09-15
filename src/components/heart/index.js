import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

class Heart extends React.Component {
  constructor(props) {
    super(props);
  }

  crossHearts() {
    if (this.props.isCrossed === true) {
      return <div>X</div>;
    }
  }

  render() {
    return (
      <div className="single-heart">
        <div
          className={`crossed ${
            this.props.isCrossed ? "visible" : "invisible"
          }`}
        >
          <p>x</p>
        </div>
        <img src="./img/heart.svg" />
        {/* {this.crossHearts()} */}
      </div>
    );
  }
}

Heart.propTypes = {
  isCrossed: PropTypes.bool
};

export default Heart;
