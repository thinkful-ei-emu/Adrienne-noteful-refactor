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
    const noteList = notes.filter((note)=>{
      if (this.props.match) {
        return note.folder_id === this.props.match.params.folderId
      } else {
        return true;
      }
    }).map((note,index) => {
      return(<div key={index} className='col-full'><Link  to={'/note/' + note.id.toString()}><Note name={note.note_name} id={note.id} modified={note.date_modified} folderId={note.folder_id} /></Link></div>)
    });
    const folderList = notes.filter((note) => {
      return note.folder_id === this.props.folder_id;
    })
    return (
      <div className="list container col-3">
        {notes.folder_id && folderList}
        {!notes.folder_id && noteList}
        <Link to='/add-note' className='col-center'>
          <button className='col-center'>Add Note</button>
        </Link>
      </div>
    )
  }
}

List.propTypes = {
  notes: PropTypes.array
}