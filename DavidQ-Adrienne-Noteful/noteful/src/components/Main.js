import React from 'react'
import List from './List';
export default function Main(props){

  return(
    <List notes = {props.notes}/>
  );
}