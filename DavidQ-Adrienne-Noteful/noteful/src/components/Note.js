import React from 'react';
import '../css/note.css';
import AppContext from './AppContext';

export default class Note extends React.Component {
  static contextType = AppContext;
  render(){
    const {deleteNote} = this.context
    return (
      <div className="note col-full">
        <p>{this.props.name}</p>
        <p>Date modified on {new Date(this.props.modified).toDateString()}</p>
        <button onClick={() => deleteNote(this.props.id)}>Delete</button>
      </div>
    )
  }

}

// return <Note key={index} name={note.name} id={note.id} modified={note.modified} folderId={note.folderId} />