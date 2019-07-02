import React from 'react';
import Folder from './Folder';
import {Link} from 'react-router-dom';
export default function Navigation(props) {

  let folders = props.folders.map((folder,index)=>{
    return (
    < Link key={index} to = {"/"+ folder.id}>
    <Folder  id={folder.id} name={folder.name}/>
    </ Link>)
  });
 return (
   <div>
     {folders}
     <button>add Folder</button>
     
   </div>
 )
}

/* "folders": [
  {
    "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
    "name": "Important"
  }, */