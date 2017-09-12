import React, { Component } from 'react'
import $ from 'jquery'
import './index.css'

class Player extends Component {
  constructor (props) {
    super(props)
  }
  remove () {
    // $('#player').remove()
    $('audio').append(`<source src="` + this.props.songUrl + `"/>`)
  }
  start () {
    this.props.getSearch()
    // console.log(this.props.searchUrl);
    // $('#player').append()
    // $('audio').attr('src', this.props.songUrl)
    // $('audio').attr('src', this.props.songUrl)
    $('audio').attr('src', this.props.songUrl)
    console.log(this.props.songUrl)

    this.next()

    // $('audio').addClass('audio')
    // $('.audio').bind('ended', function () {
    //   this.props.nextSong()
    // })
  }
  next () {
    this.nextSong()
  }
  nextSong () {
    this.props.getSearch()
  }

  render () {
    return (
      <div>
      <div id='buttons'>
        <button onClick={() => this.start()}>start</button>
        <button onClick={() => this.remove()}>remove</button>
        <button onClick={() => this.next()}>next</button>
      </div>
        <div id='player' />
        <audio controls autoPlay src={this.props.songUrl} onEnded={() => this.next()} />

      </div>
    )
  }
}

export default Player
