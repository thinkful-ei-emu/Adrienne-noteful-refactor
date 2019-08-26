import React from 'react';
import AppContext from './AppContext';
import Form from './Form';
import PropTypes from 'prop-types';
import config from '../config';

const Required = () => (
  <span className='AddFolderRequired'>*</span>
  );

export default class AddFolder extends React.Component {
  static contextType = AppContext;
  
  handleSubmit = e => {
    e.preventDefault();
    const folder_name = {
      folder_name: e.target['folder-name'].value
    };
    this.setState({ error: null });

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
  
  render() {
    return (
      <div className='AddFolder'>
        <h2>Create a folder</h2>
        <Form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
              {' '}
              <Required />
            </label>
            <input type='text' id='folder-name-input' name='folder-name' />
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