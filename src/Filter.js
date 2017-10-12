import React, { Component } from 'react'
// import $ from 'jquery'
import dropDownChoices from './dropDownChoices.js'

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artistArray: Object.entries(dropDownChoices),
      artistYear: null
    }
  }

  render () {
    let artistList = this.state.artistArray.map((artist, index) => {
      return (
        <option key={index + 1} value={artist[0]}>{artist[0]}</option>
      )
    })

    artistList.unshift(
      <option key='0'>Please Select a band</option>
    )

    let yearList = this.props.years.map((year, index) => {
      return (
        <option key={index + 1} value={year}>{year}</option>
      )
    })

    yearList.unshift(
      <option key='0'>Please Select a year</option>
    )

    return (
      <div>
        <form onSubmit={(e) => this.props.submitArtistName(e)}>
          <select id='artistOption' onChange={(e) => this.props.setArtistName(e)}>
            {artistList}
          </select>
        </form>
        <form onSubmit={(e) => this.props.submitYearChoice(e)}>
          <select id='yearOption' value={this.props.yearChoice} onChange={(e) => this.props.setYearChoice(e)}>
            {yearList}
          </select>
        </form>
        <p className='station' />
      </div>
    )
  }
}

export default Filter
