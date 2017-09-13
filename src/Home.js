import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import './App.css'
import Player from './Player.js'
import $ from 'jquery'
import Filter from './Filter.js'
import dropDownChoices from './dropDownChoices.js'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      concertArray: [],
      mp3Url: null,
      concertId: null,
      dropDownChoices: dropDownChoices,
      artistName: ' ',
      years: [' '],
      yearChoice: ' '
    }
    // this.getSearch('grateful_dead', '1970')
    this.nextSong = this.nextSong.bind(this)
    this.getSearch = this.getSearch.bind(this)
    this.setArtistName = this.setArtistName.bind(this)
    this.submitArtistName = this.submitArtistName.bind(this)
    this.setYearChoice = this.setYearChoice.bind(this)
    this.submitYearChoice = this.submitYearChoice.bind(this)
  }
  setArtistName (e) {
    this.setState({
      artistName: e.target.value,
      yearChoice: ' '
    }, function () {
      let years = dropDownChoices[this.state.artistName] || [' ']
      this.setState({
        years: years
      })
    })
  }
  submitArtistName (e) {
    e.preventDefault()
    // console.log(this.state.artistName)
    // console.log(years)
    // this.setState({
    //   years: years
    // })
  }
  setYearChoice (e) {
    this.setState({
      yearChoice: e.target.value
    }, function () {
      console.log(this.state.yearChoice)
    })

  }
  submitYearChoice (e) {
    e.preventDefault()
    // $('.station').append(`<p>` + this.state.artistName + `, ` + this.state.yearChoice + `</p>`)
    // $('select').val(' ')
  }

  getSearch () {
    // console.log('this', this.state.artistName)

    let scrubArtistName = this.state.artistName.replace(/ /g, '_')
    let search1 = scrubArtistName + '+AND+year%3A' + this.state.yearChoice
    let url = 'https://archive.org/advancedsearch.php?q=creator%3A' + search1 + '&fl%5B%5D=avg_rating&fl%5B%5D=backup_location&fl%5B%5D=btih&fl%5B%5D=call_number&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=external-identifier&fl%5B%5D=foldoutcount&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=licenseurl&fl%5B%5D=mediatype&fl%5B%5D=members&fl%5B%5D=month&fl%5B%5D=num_reviews&fl%5B%5D=oai_updatedate&fl%5B%5D=publicdate&fl%5B%5D=publisher&fl%5B%5D=related-external-id&fl%5B%5D=reviewdate&fl%5B%5D=rights&fl%5B%5D=scanningcentre&fl%5B%5D=source&fl%5B%5D=stripped_tags&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=type&fl%5B%5D=volume&fl%5B%5D=week&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json&callback=callback&save=yes'
    // console.log(search1)
    // console.log(url)
    // console.log(this.state.yearChoice, this.state.artistName)
    $.ajax({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url,
      method: 'GET',
      dataType: 'jsonp'
    }).then((response) => {
      // console.log(response);
      this.setState({
        concertArray: response.response.docs
      })

      // console.log(this.state.concertArray)
    }).then(() => {
      console.log(this.state.concertArray)
      let newConcertArray = this.state.concertArray.map((concert, index) => {
        return concert.identifier
      })
      let concertId = newConcertArray[Math.floor(Math.random() * newConcertArray.length)]
      this.setState({
        concertId: concertId
      })
      // console.log(this.state.concertId)
      this.getConcert()
    })
  }
  // setConcertId (e) {
  //   this.setState({
  //     concertId: e.target.value
  //   })
  //   this.getConcert(this.state.concertId)
  //   console.log('ID', this.state.concertId)
  // }
  getConcert () {
    let concertUrl = 'https://archive.org/metadata/' + this.state.concertId
    // console.log(concertUrl)
    $.ajax({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: concertUrl,
      method: 'GET',
      dataType: 'jsonp'
    }).then((response) => {
      console.log('get concert', response)
      let songsArray = response.files
      let mp3Array = songsArray.filter(function (song) {
        return song.format === 'VBR MP3'
      })
      let firstSong = mp3Array[Math.floor(Math.random() * mp3Array.length)]
      // console.log('song', firstSong);
      let baseUrl = 'https://' + response.d1
      let dir = response.dir
      let name = firstSong.name
      this.setState({
        mp3Url: baseUrl + dir + '/' + name

      })
      // console.log(this.state.mp3Url)
      // console.log(this.props.searchUrl);
    })
  }
  nextSong () {
    this.getSearch()
  }

  render () {
    let station =
      <div>
        <p>{this.state.artistName} {this.state.yearChoice}</p>
      </div>
    return (
      <Router>
        <div className='App'>
          <h2>Show Crawler</h2>
          {station}
          <h3>song info:</h3>
          <Filter
            dropDownChoices={this.state.dropDownChoices}
            years={this.state.years}
            yearChoice={this.state.yearChoice}
            setArtistName={this.setArtistName}
            submitArtistName={this.submitArtistName}
            setYearChoice={this.setYearChoice}
            submitYearChoice={this.submitYearChoice}
          />
          <Player
            getSearch={this.getSearch}
            nextSong={this.nextSong}
            songUrl={this.state.mp3Url} />
        </div>
      </Router>
    )
  }
}

export default Home
