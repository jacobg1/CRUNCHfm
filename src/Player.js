import React, { Component } from 'react'
import $ from 'jquery'
import Search from './Search.js'

class Player extends Component {
  constructor (props) {
    super (props)
  }
  log () {
    console.log(this.props.searchUrl);
    $('#player').append(`<audio controls><source src="` + this.props.searchUrl + `"></audio>`)

  }
  render () {
    return (
      <div>
      <h1 onClick={() => this.log()}>TEST</h1>
      <div id="player"></div>
      </div>
    )
  }
}

export default Player
