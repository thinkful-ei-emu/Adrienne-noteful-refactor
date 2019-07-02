import React from 'react';

export default function Note(props) {
// const date = new Date(props.modified)
 return (
   <>
     <p>{props.name}</p>
     <p>Date modified on {new Date(props.modified).toDateString()}</p>
     <button>Delete</button>
   </>
 )
}

// return <Note key={index} name={note.name} id={note.id} modified={note.modified} folderId={note.folderId} />