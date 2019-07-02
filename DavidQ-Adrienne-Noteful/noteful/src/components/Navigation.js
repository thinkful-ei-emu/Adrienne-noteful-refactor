import React from 'react';
import Folder from './Folder';
import {Link} from 'react-router-dom';
export default function Navigation(props) {

let folders = '';

if (props.folders) {folders = props.folders.map((folder,index)=>{
    return (
    <Link key={index} to = {"/folder/"+ folder.id}>
    <Folder  id={folder.id} name={folder.name}/>
    </Link>)
  });
}
 return (
   <div>
     {!props.folders && <button onClick={()=> props.history.goBack()}>Go Back</button>}
     {folders}
     {props.folders && <button>add Folder</button>}
   </div>
 )
}
