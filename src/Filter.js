import React, { Component } from 'react'
import $ from 'jquery'
import dropDownChoices from './dropDownChoices.js'

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artistArray: Object.entries(dropDownChoices),
      artistYear: null
    }

    // let newNewArray = this.state.artistArray.map((artist, index) => {
    //   return artist[0]
    // })
    console.log(this.state.artistArray)
    console.log(this.props.years)
    // console.log(this.state);
    // console.log(this.state.artistName)
  }

  render () {
    let artistList = this.state.artistArray.map((artist, index) => {
      return (
        <option key={index} value={artist[0]}>{artist[0]}</option>
      )
      // artistList.unshift(
      //   <option key="0">Please Select a band</option>
      // )
    })

    let yearList = this.props.years.map((year, index) => {
      return (
        <option key={index} value={year}>{year}</option>
      )
      // yearList.unshift(
      //   <option key="0">Please Select a band</option>
      // )
    })
    return (
      <div>
        <form onSubmit={(e) => this.props.submitArtistName(e)}>
          <select id='artistOption' value={this.props.artistName} onChange={(e) => this.props.setArtistName(e)}>
            {artistList}
          </select>
          <input type='submit' value='submit' />
        </form>
        <form onSubmit={(e) => this.props.submitYearChoice(e)}>
          <select id='yearOption' value={this.props.yearChoice} onChange={(e) => this.props.setYearChoice(e)}>
            {yearList}
          </select>
          <input type='submit' value='submit' />
        </form>
      </div>
    )
  }
}
export default Filter
