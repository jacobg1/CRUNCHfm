import React, { Component } from 'react'
import $ from 'jquery'
import Player from './Player.js'

class Search extends Component {


  render () {
    let concertList = this.state.concertArray.map((concert, index) => {
      // let link = 'https://archive.org/details/' + concert.identifier
      return (
        <li key={index} onClick={() => this.getConcert()}>
          <p>{concert.title}</p>
        </li>
      )
    })
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
