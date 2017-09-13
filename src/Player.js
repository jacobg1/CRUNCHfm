import React, { Component } from 'react'
import $ from 'jquery'
import './index.css'

class Player extends Component {
  constructor (props) {
    super(props)
  }

  start () {
    this.props.getSearch()
    $('audio').attr('src', this.props.songUrl)
    // console.log(this.props.songUrl)
    //
    // console.log(this.props.songUrl);


  }
  next () {
    this.nextSong()
  }
  nextSong () {
    this.props.getSearch()
    // $('select').val(' ')

  }

  render () {
    return (
      <div>
      <div id='buttons'>
        <button onClick={() => this.start()}>start</button>
        <button onClick={() => this.next()}>next</button>
      </div>
        <div id='player' />
        <audio controls autoPlay src={this.props.songUrl} onEnded={() => this.next()} />

      </div>
    )
  }
}

export default Player
