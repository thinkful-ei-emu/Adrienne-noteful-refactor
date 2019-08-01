import React from 'react';

export default function Form(props) {
  console.log(props);
  const { className, ...otherProps } = props; 
  return (
    <form className={['Noteful-form', className].join(' ')}
    action='#'
    {...otherProps}
    />
  )
};