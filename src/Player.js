import React, { Component } from 'react'
import $ from 'jquery'
import './index.css'
import {
  Button,
  ButtonGroup
} from 'react-bootstrap'

class Player extends Component {
  start () {
    this.props.getSearch()
    $('audio').attr('src', this.props.songUrl)
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
        <div id='button'>
          <ButtonGroup id='buttons' vertical>
            <Button onClick={() => this.start()}>start / next</Button>
          </ButtonGroup>
        </div>
        <div id='player' />
        <audio controls autoPlay src={this.props.songUrl} onEnded={() => this.next()} color='red' />
      </div>
    )
  }
}

export default Player
