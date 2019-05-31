import React, { Component } from "react";
import { connect } from "react-redux";
import { Items } from "./Items";
import addAction from "./actions/addAction";

export class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredText: ""
    };
  }
  addItem = () => {
    const enteredText = this.state.enteredText;
    this.setState({ enteredText: "" });
    this.props.addAction(enteredText);
  };
  onChange = e => {
    this.setState({ enteredText: e.target.value });
  };
  render() {
    console.log("items props", this.props);
    return (
      <div id="addContainer">
        <div className="wrapper">
          <input
            type="text"
            value={this.state.enteredText}
            onChange={this.onChange}
          />
          <input type="button" value="Adddd" onClick={this.addItem} />
        </div>
        <div id="itemsHolder">
          <Items items={this.props.items} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addAction: () => dispatch(addAction())
//   };
// };

const mapDispatchToProps = { addAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsContainer);
