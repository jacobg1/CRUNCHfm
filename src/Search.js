import React, { Component } from 'react'
import $ from 'jquery'
import Player from './Player.js'

class Search extends Component {


  render () {
  
    return (
      <div>
        <h1>Search Results</h1>
        <div id='concert-list'>
          {concertList}
        </div>
        <div id='concert-details' />
      </div>
    )
  }
}

export default Search
