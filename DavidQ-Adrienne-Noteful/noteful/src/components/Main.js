import React from 'react'
import List from './List';
import PropTypes from 'prop-types';


export default function Main(props){

  return(
    <List notes={props.notes}/>
  );
}


Main.propTypes = {
  notes: PropTypes.array
}