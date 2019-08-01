import React from 'react';
import Note from './Note';
import PropTypes from 'prop-types';

export default function NotePage(props) {
  if(!props.notes) {
    return <h2>Could not display this note</h2>
  }
 return (
  <div className='col-full'>
    <Note name={props.notes.name} modified={props.notes.modified} id={props.notes.id}/>
    {props.notes.content}
  </div>
 )
}

NotePage.propTypes = {
  notes: PropTypes.array,
  modified: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string,
  name: PropTypes.string
}