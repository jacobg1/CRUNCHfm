import React, { Component } from 'react'
import $ from 'jquery'

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artistArray: Object.entries(this.props.dropDownChoices),
      artistName: Object.entries(this.props.dropDownChoices)[0][0],
      artistYear: null
    }

    this.setArtistName = this.setArtistName.bind(this)
    // console.log(this.state);
    console.log(this.state.artistName)
  }
  setArtistName (event) {
    this.setState({
      artistName: event.target.value
    })
    console.log(this.state.artistName)
  }
  render () {
    let artistList = this.state.artistArray.map((artist, index) => {
      // console.log(artist[1]);
      return (
        <option key={index} value={artist[0]}>
          {artist[0]}
        </option>
      )
      // let yearList = this.state.artistArray
    })
    return (
      <div>
        <form>
          <select id='artistOption' value={this.state.artistName} onChange={this.setArtistName} >
            {artistList}
          </select>
        </form>
        <select id='yearOption' />
      </div>
    )
  }
}
export default Filter
