import React from 'react';
import AppContext from './AppContext';
import {NavLink} from 'react-router-dom';
import Folder from './Folder';
import '../css/Nav.css';


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
      <Folder name={folder.name} />
      </NavLink>)
      });
    }
    console.log(folders);
  return (
   <div className="side-bar">
     {<button onClick={()=> this.props.history.goBack()}>Go Back</button>}
     {allFolders}
     {folders && <button>add Folder</button>}
   </div>
 )
}
}