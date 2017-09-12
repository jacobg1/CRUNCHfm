import React, { Component } from 'react'
import $ from 'jquery'

class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: true
    }
  }
  remove () {
    $('#player').remove()
    $('audio').append(`<source src="` + this.props.songUrl + `"/>`)
  }
  start () {
    // console.log(this.props.searchUrl);
    $('#player').append()
    $('audio').append(`<source src="` + this.props.songUrl + `"/>`)
    $('audio').addClass('audio')
    // $('.audio').bind('ended', function () {
    //   this.props.nextSong()
    // })
  }

  render () {
    return (
      <div>
        <div id='buttons'>
          <button onClick={() => this.start()}>start</button>
          <button onClick={() => this.remove()}>remove</button>
          <button onClick={() => this.props.getSearch()}>next</button>
        </div>

        <div id='player' />
        <audio controls autoPlay onEnded={() => this.props.getSearch()}>
        </audio>
      </div>
    )
  }
}

export default Player
