import React, { Component } from "react";
import ItemsContainer from "./ItemsContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <ItemsContainer />
        </div>
      </div>
    );
  }
}

export default App;
