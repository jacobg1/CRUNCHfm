import React, { Component } from 'react'
import $ from 'jquery'

class AudioPlayer extends Component {
  constructor () {
    super()
    this.state = {
      source: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'
    }
  }
  play () {
    let audio = $('#newId')
    // $('audio').attr('src', this.state.source)
    console.log(audio.play());
    console.log('play');
    // audio.play()
  }
  render () {
    return (
      <div>
        <p>audio player coming</p>
        <div className='playButton' onClick={() => this.play()}>Play</div>
        <audio controls id='newId' autoPlay preload src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"/>
      </div>
    )
  }
}

export default AudioPlayer
