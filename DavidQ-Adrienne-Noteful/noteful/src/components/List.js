import React from 'react';
import {Link} from 'react-router-dom';
import Note from './Note';
import '../css/List.css';
import AppContext from './AppContext';


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
      // console.log(note.folderId);
      return note.folderId === this.props.folderId;
    })
    // console.log(folderList);
    return (
      <div className="list container col-3">
        {notes.folderId && folderList}
        {!notes.folderId && noteList}
        <button className='col-center'>Add Note</button>
      </div>
    )
  }
}