import React, { Component } from "react";

export class Items extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const listItems = this.props.items.map((item, index) => {
      return <li>{item}</li>;
    });
    return <div id="listItems">{listItems}</div>;
  }
}

export default Items;
