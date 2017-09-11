import React, { Component } from 'react';
import './App.css';
import Search from './Search.js'
import Player from './Player.js'

class App extends Component {
  constructor () {
    super ()
    this.state = {
      searchUrl: null
    }
    this.setSearchUrl = this.setSearchUrl.bind(this)
  }
setSearchUrl (e) {
  this.setState({
    searchUrl: e
  })
  console.log(this.state.searchUrl);
}
  render() {
    return (
      <div className="App">
          <h2>Show Crawler</h2>
          <Player searchUrl={this.state.searchUrl}/>
          <Search setSearchUrl={(url) => this.setSearchUrl(url)}/>
      </div>
    );
  }
}

export default App;
