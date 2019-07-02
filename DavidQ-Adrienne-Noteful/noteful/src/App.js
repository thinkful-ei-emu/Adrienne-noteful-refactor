import React from 'react';
import './App.css';
import List from './components/List';
import Navigation from './components/Navigation';


export default class App extends React.Component {
  state={
    ...this.props.DummyStore
  }

  render(){
    return(
      <>
        <h1>Noteful</h1>
        <Navigation folders={this.state.folders}/>
        <List notes={this.state.notes}/>
      </>
    )
  }
}
