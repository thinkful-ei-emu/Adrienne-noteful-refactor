import React from 'react';
import AppContext from './AppContext';
import {NavLink, Link} from 'react-router-dom';
import Folder from './Folder';
import '../css/Nav.css';
import PropTypes from 'prop-types';

export default class Navigation extends React.Component {
  static contextType = AppContext;
  render(){
    if(!this.context){
      return <p>Something went wrong</p>
    }
   
    const {folders} = this.context;
    let allFolders;
    
    if (folders) {
      allFolders = folders.map((folder,index)=>{
      return (
      <NavLink className="Nav" isActive={()=> this.props.match.params.folderId === folder.id}  key={index} to = {"/folder/"+ folder.id}>
      <Folder name={folder.folder_name} />
      </NavLink>)
      });
    }
  return (
   <div className="side-bar">
     {<button onClick={()=> this.props.history.goBack()}>Go Back</button>}
     {allFolders}
     {folders && <Link to='/add-folder'><button>Add Folder</button></Link>}
   </div>
 )
}
}

Navigation.propTypes = {
  folders: PropTypes.array,
  history: PropTypes.object
}