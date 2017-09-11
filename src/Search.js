import React, { Component } from 'react'
import $ from 'jquery'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      concertArray: [],
      mp3Url: null
    }
    // this.getSearch()
  }
  // getSearch () {
  componentWillMount () {
    let band = 'grateful_dead'
    let year = '1970'
    let url = 'https://archive.org/advancedsearch.php?q=creator%3A' + band + '+AND+year%3A' + year + '&fl%5B%5D=avg_rating&fl%5B%5D=backup_location&fl%5B%5D=btih&fl%5B%5D=call_number&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=external-identifier&fl%5B%5D=foldoutcount&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=licenseurl&fl%5B%5D=mediatype&fl%5B%5D=members&fl%5B%5D=month&fl%5B%5D=num_reviews&fl%5B%5D=oai_updatedate&fl%5B%5D=publicdate&fl%5B%5D=publisher&fl%5B%5D=related-external-id&fl%5B%5D=reviewdate&fl%5B%5D=rights&fl%5B%5D=scanningcentre&fl%5B%5D=source&fl%5B%5D=stripped_tags&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=type&fl%5B%5D=volume&fl%5B%5D=week&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json&callback=callback&save=yes'
    $.ajax({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url,
      method: 'GET',
      dataType: 'jsonp'
    }).then((response) => {
      this.setState({
        concertArray: response.response.docs
      })
      // console.log(this.state.concertArray)

      // console.log(this.state.concertArray)
    })
  }
  nextConcert (concertId) {
    let concertUrl = 'https://archive.org/metadata/' + concertId
// console.log(concertUrl);
    $.ajax({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: concertUrl,
      method: 'GET',
      dataType: 'jsonp'
    }).then((response) => {
      let songsArray = response.files
      let mp3Array = songsArray.filter(function (song) {
        return song.format === 'VBR MP3'
      })
      let firstSong = mp3Array[0]
      let baseUrl = 'https://' + response.d1
      let dir = response.dir
      let name = firstSong.name
      this.setState({
        mp3Url: baseUrl + dir + '/' + name
      })
      // console.log(this.state.mp3Url)
      this.props.setSearchUrl(this.state.mp3Url)
      // console.log(this.props.searchUrl);
    })
  }

  render () {
    let concertList = this.state.concertArray.map((concert, index) => {
      // let link = 'https://archive.org/details/' + concert.identifier
      return (
        <li key={index} onClick={() => this.nextConcert(concert.identifier)}>
          <p>{concert.title}</p>
        </li>
      )
    })
    return (
      <div>
        <h1>Search Results</h1>
        <div id='concert-list'>
          {concertList}
        </div>
        <div id='concert-details' />
      </div>
    )
  }
}

export default Search
