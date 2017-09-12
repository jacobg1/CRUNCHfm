import React, { Component } from 'react'
import $ from 'jquery'
import dropDownChoices from './dropDownChoices.js'

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artistArray: Object.entries(dropDownChoices),
      artistYear: null,
    }

    // let newNewArray = this.state.artistArray.map((artist, index) => {
    //   return artist[0]
    // })
    console.log(this.state.artistArray)
    // console.log(this.state);
    // console.log(this.state.artistName)
  }

  render () {
    let artistList = this.state.artistArray.map((artist, index) => {
      return (
        <option key={index} value={artist[0]}>{artist[0]}</option>
      )
      // let yearList = this.state.artistArray
    })
    return (
      <div>
        <form onSubmit={(e) => this.props.submitArtistName(e)}>
          <select id='artistOption' value={this.props.artistName} onChange={(e) => this.props.setArtistName(e)}>
            {artistList}
          </select>
          <input type="submit" value="submit" />
        </form>
        <select id='yearOption' />
      </div>
    )
  }
}
export default Filter
