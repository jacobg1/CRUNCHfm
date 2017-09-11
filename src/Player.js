import React, { Component } from 'react'
import $ from 'jquery'
import Search from './Search.js'

class Player extends Component {
  constructor (props) {
    super (props)
  }
  remove() {

$('audio').remove()
$('#player').append(`<audio controls><source src="` + this.props.searchUrl + `"></audio>`)

  }
  start () {
    // console.log(this.props.searchUrl);


    $('#player').append(`<audio controls><source src="` + this.props.searchUrl + `"></audio>`)
    $('audio').addClass('audio')

  }
  render () {
    return (
      <div>
      <button onClick={() => this.start()}>start</button>
      <button onClick={() => this.remove()}>remove</button>
      <div id="player"></div>

      </div>
    )
  }
}

export default Player
