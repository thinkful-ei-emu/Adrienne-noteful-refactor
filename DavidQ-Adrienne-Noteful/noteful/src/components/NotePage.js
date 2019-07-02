import React from 'react';
import Note from './Note';

export default function NotePage(props) {
 return (
   <div className='col-full'>
  <Note name={props.notes.name} modified={props.notes.modified}/>
  {props.notes.content}
  </div>
 )
}