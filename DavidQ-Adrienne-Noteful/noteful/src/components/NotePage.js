import React from 'react';
import Note from './Note';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default class NotePage extends React.Component {
  static contextType = AppContext;
  render() {
    const findNote = (notes=[], noteId) => 
      notes.find(note => note.id.toString() === noteId)
    const note = findNote(this.context.notes, this.props.match.params.noteId);
    if(!note) {
      return <h2>Could not display this note</h2>
    }
    return(
      <div className='col-full'>
        <Note name={note.note_name} modified={note.date_modified} id={note.id} content={note.content} />
        <p>{note.content}</p>
      </div>
    )
  }
}

NotePage.propTypes = {
  notes: PropTypes.array,
  modified: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string,
  name: PropTypes.string
}