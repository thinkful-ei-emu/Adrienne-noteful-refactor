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
        return note.folderId === this.props.match.params.folderId
      } else {
        return true;
      }
    }).map((note,index) => {
      return(<div key={index} className='col-full'><Link  to={'/note/' + note.id}><Note name={note.name} id={note.id} modified={note.modified} folderId={note.folderId} /></Link></div>)
    });
    const folderList = notes.filter((note) => {
      return note.folderId === this.props.folderId;
    })
    return (
      <div className="list container col-3">
        {notes.folderId && folderList}
        {!notes.folderId && noteList}
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