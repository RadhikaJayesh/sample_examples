import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './Board';
import Icons from './Icons';

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.state = { board:[],highLightCell:[]};
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.highLightCell = this.highLightCell.bind(this);
    this.clearHightlight = this.clearHightlight.bind(this);
  }
  highLightCell(index) {
    const cellList = this.state['highLightCell'];
    return cellList[index] ? '1px solid green':''
  }
  setHightlight(index){
    const cellList = this.state['highLightCell'];
    cellList[index] = true;
    this.setState({highLightCell: [...cellList]});
  }
  
  clearHightlight(index){
    this.setState({highLightCell: []});
  }
  validMove(x,y){
    console.log(y,'*',8,'+',x, '=', y*8 + x );
    return (x>=0 && y>=0 && x<8 && y<8)? y*8 + x : null;
  }
  possibleMoves(index, type){
    const moves = [];
    let  x, y;
    x = index % 8;
    y = parseInt(index / 8);
    console.log('X :',x,'Y :',y)

    moves.push(this.validMove(x-2 ,y-1));
    moves.push(this.validMove(x-2 ,y+1));

    moves.push(this.validMove(x+2 ,y-1));
    moves.push(this.validMove(x+2 ,y+1));

    moves.push(this.validMove(x-1 ,y-2));
    moves.push(this.validMove(x+1 ,y-2));

    moves.push(this.validMove(x-1 ,y+2));
    moves.push(this.validMove(x+1 ,y+2));

    moves.forEach((val)=>{ 
        if(val) {
          this.setHightlight(val);
          console.log(val);
        }  
        });     
  }
  drag(ev) {
      ev.dataTransfer.setData("icon", ev.target.id);
      console.log('Drag', ev.target.id);
      const cellId = document.getElementById(ev.target.id).parentElement.getAttribute('id')
      const pickedCell = cellId? cellId.match(/\d+/g)[0]:null;
      console.log("Picked Cell", pickedCell);
      this.possibleMoves(pickedCell)
  
  }
  allowDrop(ev) {
      ev.preventDefault();
  }

  drop = (ev) => {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("icon");
      ev.target.appendChild(document.getElementById(data));
      const currentCell = ev.target.id.match(/\d+/g)[0];
      console.log(currentCell);

      const board = this.state['board'];
      board[currentCell] = data;
      this.setState({board: [...board]});
      this.clearHightlight();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         <Board drop={this.drop} allowDrop={this.allowDrop} highLightCell={this.highLightCell}/>
         <Icons drag={this.drag}/>
      </div>
    );
  }
}

export default App;
