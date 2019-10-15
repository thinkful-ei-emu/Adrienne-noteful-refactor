import React from 'react';
import AppContext from './AppContext';
import Form from './Form';
import PropTypes from 'prop-types';
import config from '../config';

export default class AddNote extends React.Component {
  static contextType = AppContext;

  state = {
    error: null
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const note = {
      note_name: e.target['note-name'].value,
      folder_id: e.target['select-folder'].value,
      content: document.getElementById('note-content').value
    };

    if(note.note_name === ' ') {
      return this.setState({ error: 'Invalid name input' });
    } else if(note.content === ' ') {
      return this.setState({ error: 'Invalid content input' });
    }

    fetch(`${config.API_ENDPOINT}/notes`, {
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
      this.setState({error: error})
    })
  }

  handleErrorClose = () => {
    this.setState({ error: null });
  }
  
  render() {
    const { error } = this.state;
    let folders = this.context.folders;
    let options = folders.map((folder) => <option key={folder.id} value={folder.id}>{folder.folder_name}</option>)
    return (
      <div className='AddNote'>
        {error && <span className="error">{error}<button className="error-button" onClick={() => this.handleErrorClose()} aria-label="close">X</button></span>}
        <h2>Create a note</h2>
        <Form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name * 
            </label>
            <input type='text' id='note-name-input' name='note-name' required />
            {' '}
            <select id='select-folder'>
              {options}
            </select>
            {' '}
            <label htmlFor='note-content' className='note-content'>Content </label>
            <textarea rows='4' cols='50' id='note-content' />
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