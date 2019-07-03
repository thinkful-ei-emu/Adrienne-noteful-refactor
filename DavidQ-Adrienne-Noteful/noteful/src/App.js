import React from 'react';
import {Route} from 'react-router-dom';
//--------------->components
import List from './components/List';
import Navigation from './components/Navigation';
import Main from './components/Main';
import NotePage from './components/NotePage';
import AppContext from './components/AppContext';
import Api from './Api';
//--------------CSS
import './css/grid.css';
import Error from './components/Error';
import './App.css';

export default class App extends React.Component {
  state={
    ...this.props.DummyStore
  }

  componentDidMount() {
    Promise.all([
      Api.fetchTheStuff('/folders'),
      Api.fetchTheStuff('/notes')
    ]).then(response => this.setState({folders: response[0], notes: response[1]}))
    .catch((error) => {
      alert(`Something went wrong: ${error.message}`)
    })
  }

  deleteNote = (id) => {
    Api.fetchTheStuff(`/notes`, id, 'DELETE')
    this.setState({notes: this.state.notes.filter((note) => {
      return note.id !== id;
    })})
    // need to fix the goBack at some point
    this.props.history.goBack();
  }  

  render(){
    // console.log(this.props);
    return(
      <AppContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes,
        deleteNote: this.deleteNote
          }}>
      <header className = 'App-header'>
        <h1>Noteful</h1>
      </header>
      <main className="container">
        <div className='col'>
          <Route exact path='/' component={Navigation} />
          {/* <Route exact path="/" render={(props)=>{return<Navigation {...props} folders={this.state.folders}/>}}/> */}
          <Route exact path="/folder/:folderId" component={Navigation}/>
          <Route path='/note/:noteId' component={Navigation} />
        </div>
        <div className='col-3'>
          <Route exact path='/' component={Main} />
          <Route path='/folder/:folderId' component={List} />
          {/* <Route exact path="/" render={(props)=>{return<Main {...props} notes={this.state.notes}/>}}/> */}
          {/* <Route path="/folder/:folderId" render={(props)=>{return<List {...props} notes={this.state.notes.filter((note)=>{
          return note.folderId === props.match.params.folderId
        })} folderId={props.match.params.folderId}/>}}/> */}
          <Route path="/note/:noteId" render={(props)=>{return <NotePage {...props} notes={this.state.notes.find((note)=>{
            return note.id === props.match.params.noteId})}/>}} folderId={this.state.notes.folderId}/>
          <Route path="/" Component={Error}/>
        </div>
      </main>
      </AppContext.Provider>
    )
  }
}
