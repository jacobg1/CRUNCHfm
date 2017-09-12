import React, { Component } from 'react'
import $ from 'jquery'

class Player extends Component {

  remove () {
    $('audio').remove()
    $('#player').append(`<audio controls><source src="` + this.props.songUrl + `"></audio>`)
  }
  start () {
    // console.log(this.props.searchUrl);

    $('#player').append(`<audio controls><source src="` + this.props.songUrl + `"></audio>`)
    $('audio').addClass('audio')
  }
  render () {
    return (
      <div>
      <div id="buttons">
        <button onClick={() => this.start()}>start</button>
        <button onClick={() => this.remove()}>remove</button>
        <button onClick={() => this.props.nextSong()}>next</button>
        </div>
        <div id='player' />

      </div>
    )
  }
}

export default Player
