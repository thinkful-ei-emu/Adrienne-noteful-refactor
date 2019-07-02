import React from 'react';
import {Route, Switch} from 'react-router-dom';
//--------------->components
import List from './components/List';
import Navigation from './components/Navigation';
import Main from './components/Main';
//--------------CSS
import './css/grid.css';
import Error from './components/Error';
import './App.css';

export default class App extends React.Component {
  state={
    ...this.props.DummyStore
  }

  render(){
    return(
     <>
        <header className = 'App-header'>
        <h1>Noteful</h1>
        </header>
      <main className="container">
        <Navigation folders={this.state.folders}/>
        <Route exact path="/" render={(props)=>{return<Main {...props} notes={this.state.notes}/>}}/>
        <Route path="/:folderId" render={(props)=>{return <List {...props} notes={this.state.notes.filter((note)=>{
          return note.folderId === props.match.params.folderId
        })} folderId={props.match.params.folderId}/>}}/>
        <Route path="/" Component={Error}/>
      </main>
      </>
    )
  }
}
