import React from 'react';
import '../css/note.css';
import AppContext from './AppContext';
import PropTypes from 'prop-types';
import config from '../config';

function deleteNoteRequest(noteId, cb) {
  fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => {
          throw error;
        })
      }
      return res.json();
    })
    .then(data => {
      cb(noteId);
    })
    .catch(error => {
      console.error(error);
    })
}

export default class Note extends React.Component {
  static contextType = AppContext;
  render(){
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="note col-full">
            <p>{this.props.name}</p>
            <p>Date modified on {new Date(this.props.modified).toDateString()}</p>
            <button onClick={() => deleteNoteRequest(this.props.id, context.deleteNote)}>Delete</button>
          </div>
        )}
      </AppContext.Consumer>
    )
  }
}


Note.propTypes = {
  notes: PropTypes.array,
  folders: PropTypes.array,
  url: PropTypes.string,
  history: PropTypes.object,
  modified: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string
}