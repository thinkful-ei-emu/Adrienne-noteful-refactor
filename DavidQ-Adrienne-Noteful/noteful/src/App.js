import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
//--------------->components
import List from './components/List';
import Navigation from './components/Navigation';
import Main from './components/Main';
import NotePage from './components/NotePage';
import AppContext from './components/AppContext';
import Error from './components/Error';
import ErrorBoundary from './components/ErrorBoundary';
// import Api from './Api';
import config from './config';
import AddFolder from './components/AddFolder';
import AddNote from './components/AddNote';
//--------------CSS
import './css/grid.css';
import './App.css';


export default class App extends React.Component {
  state={
    ...this.props.DummyStore,
    error: null,
    deleteNote: false
  }


  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/folders`),
      fetch(`${config.API_ENDPOINT}/notes`)
    ]).then(([foldersRes, notesRes]) => {
      if(!notesRes.ok) {
        return notesRes.json().then(e => Promise.reject(e));
      }
      if(!foldersRes.ok) {
        return foldersRes.json().then(e => Promise.reject(e));
      }
      return Promise.all([
        notesRes.json(),
        foldersRes.json()
      ])
    })
    .then(([notes, folders]) => this.setState({ notes, folders }))
    .catch((error) => {
      console.error({ error });
    })

  }

  deleteNote = id => {
    const newNotes = this.state.notes.filter(note => note.id !== id);
    this.setState({ deleteNote: true, notes: newNotes }, () => {
      setTimeout(() => { this.setState({ deleteNote: false }) }, 100)});
  } 


  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    });
  }

  handleAddNote = note => {
    console.log('addnote');
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.deleteNote
    };
    if(this.state.deleteNote === true) {
      return (
        <Redirect to='/' />
      )
    }
    return(
      <AppContext.Provider value={contextValue}>
      <header className = 'App-header'>
        <Link to='/' className='nav-link'>
          <h1>Noteful</h1>
        </Link>
      </header>
      <main className="container">
        <div className='col' aria-live='polite'>
          <Route exact path='/' component={Navigation} />
          <Route exact path="/folder/:folderId" component={Navigation}/>
          <Route path='/note/:noteId' component={Navigation} />
          <Route path='/add-folder' component={Navigation} />
          <Route path='/add-note' component={Navigation} />
        </div>
        <div className='col-3'>
          <ErrorBoundary>
            <Route exact path='/' component={Main} />
            <Route path='/folder/:folderId' component={List} />
            <Route path="/note/:noteId" render={(props)=>{return <NotePage {...props} notes={this.state.notes.find((note)=>{
              return note.id === props.match.params.noteId})}/>}} folderId={this.state.notes.folderId}/>
          </ErrorBoundary>
          <Route path='/add-folder' component={AddFolder} />
          <Route path='/add-note' component={AddNote} />
          <Route path="/" Component={Error}/>
        </div>
      </main>
      </AppContext.Provider>
    )
  }
}
