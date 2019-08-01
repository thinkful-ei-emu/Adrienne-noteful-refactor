import React from 'react';
import AppContext from './AppContext';
import Form from './Form';
import PropTypes from 'prop-types';

const Required = () => (
  <span className='AddNoteRequired'>*</span>
  );

export default class AddNote extends React.Component {
  static contextType = AppContext;
  
  handleSubmit = e => {
    e.preventDefault();
    const note = {
      name: e.target['note-name'].value
    };
    this.setState({ error: null });

    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e));
      return res.json();
    })
    .then(note => {
      this.context.addNote(note);
      this.props.history.push(`/note/${note.id}`);
    })
    .catch(error => {
      console.error({error});
    })
  }
  
  render() {
    return (
      <div className='AddNote'>
        <h2>Create a note</h2>
        <Form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
              {' '}
              <Required />
            </label>
            <input type='text' id='note-name-input' name='note-name' />
            {' '}
            <button type='submit'>Save</button>
          </div>
        </Form>
      </div>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.object
}