import React from 'react';
import {Link} from 'react-router-dom';
import Note from './Note';
import '../css/List.css';
import AppContext from './AppContext';
import PropTypes from 'prop-types';

export default class List extends React.Component {
  static contextType = AppContext;

  render() {
    const {notes} = this.context;
    const noteList = notes.map((note,index) => {
      return(<div key={index} className='col-full'><Link  to={'/note/' + note.id.toString()}><Note name={note.note_name} id={note.id} modified={note.date_modified} folderId={note.folder_id} /></Link></div>)
    });
    const folderList = notes.filter((note) => `/folder/${note.folder_id}` === this.props.match.url)
      .map(note => {
        const date = new Date(note.date_modified)
        const convertedDate = date.toDateString()
        return (
          <li key={note.id}>
              <Link to={`/note/${note.id}`}>
              <h2>{note.note_name}</h2>
              </Link>
              <p>Date Modified On: {convertedDate}</p>
              <button type="button" className="delete-button" onClick={()=>this.context.deleteNote(note.id)}>Delete Note</button>
          </li>
        )});
    if (this.props.match.url === '/') {
      return (
        <>
          <ul className="note-list">
            {noteList}
          </ul>
          <Link to='/add-note' className='col-center'>
            <button className='col-center'>Add Note</button>
          </Link>
        </>
      )
    } else {
      return (
        <>
          <ul className="note-list">
            {folderList}
          </ul>
          <Link to='/add-note' className='col-center'>
            <button className='col-center'>Add Note</button>
          </Link>
        </>
      )
    }
  }
}

List.propTypes = {
  notes: PropTypes.array
}