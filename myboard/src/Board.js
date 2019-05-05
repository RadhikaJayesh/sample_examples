import React, { Component } from 'react';
import './App.css';
class Cell extends Component {
    render(){
        const { id, drop,allowDrop, highLightCell } = this.props;
        const index = parseInt(id);
        const backgroundColor = highLightCell(index)?'green':parseInt((index/ 8) + index) % 2 === 0 ? '#ababab' : 'white';
        return (<div id={`cell-${id}`}  className={'cell'} style={{backgroundColor:backgroundColor}} onDrop={(e) => drop(e)} onDragOver={(e)=>allowDrop(e)}> </div>)
    } 
}

class Board extends Component {
    createBoard(){
        let cells = [];
        for (let i=0; i< 64; i++){
            cells.push( <Cell key={i} id={i} {...this.props}/>)
          }
          return cells; 
      }
    render() {
      return (
        <div id="mainChessBoard">
            {this.createBoard()}
        </div>        
      );
    }
  }
  
  export default Board;