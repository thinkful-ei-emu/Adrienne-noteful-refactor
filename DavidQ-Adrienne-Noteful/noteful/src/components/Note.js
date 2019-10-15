import React from 'react';
import '../css/note.css';
import AppContext from './AppContext';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  static contextType = AppContext;
  render(){
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="note col-full">
            <p>{this.props.name}</p>
            <p>Date modified on {new Date(this.props.modified).toDateString()}</p>
            <button onClick={() => context.deleteNote(this.props.id)}>Delete</button>
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
  id: PropTypes.number
}