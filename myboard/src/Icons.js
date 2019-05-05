import React, { Component } from 'react';
import knight from './icons/knight.svg';
class Icons extends Component {
    drag(ev) {
        ev.dataTransfer.setData("icon", ev.target.id);

    } 
   render(){
       const {drag} = this.props;
       return(
        <img id="knight1" src={knight} draggable="true"
        onDragStart={(e)=>drag(e)} width="38px" height="38px"  alt=""/>
       )
   };
} 

export default Icons;
