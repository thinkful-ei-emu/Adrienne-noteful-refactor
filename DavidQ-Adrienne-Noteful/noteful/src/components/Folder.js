import React from 'react';
import '../css/folder.css'
export default function Folder(props) {
 return (
   <div className="folder col-full">
     <h2>{props.name}</h2>
   </div>
 )
}