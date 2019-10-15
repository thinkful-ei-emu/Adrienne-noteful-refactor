import React from 'react';
import AppContext from './AppContext';
import Form from './Form';
import PropTypes from 'prop-types';
import config from '../config';

export default class AddFolder extends React.Component {
  static contextType = AppContext;

  state = {
    error: null
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const folder_name = {
      folder_name: e.target['folder-name'].value
    };

    if(folder_name.folder_name === ' ') {
      return this.setState({ error: 'Invalid input' });
    }

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder_name)
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e));
      return res.json();
    })
    .then(folder => {
      this.context.addFolder(folder);
      this.props.history.push(`/folder/${folder.id}`);
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleErrorClose = () => {
    this.setState({ error: null });
  }
  
  render() {
    const { error } = this.state;
    return (
      <div className='AddFolder'>
        {error && <span className="error">{error}<button className="error-button" onClick={() => this.handleErrorClose()} aria-label="close">X</button></span>}
        <h2>Create a folder</h2>
        <Form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name * 
            </label>
            <input type='text' id='folder-name-input' name='folder-name' required />
            {' '}
            <button type='submit'>Save</button>
          </div>
        </Form>
      </div>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
}