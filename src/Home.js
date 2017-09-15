import React, { Component } from 'react'
import './App.css'
import Player from './Player.js'
import $ from 'jquery'
import Filter from './Filter.js'
import dropDownChoices from './dropDownChoices.js'
// import AudioPlayer from './AudioPlayer.js'
import Audio from 'react-audioplayer'
import {
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup
} from 'react-bootstrap'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playList: [],
      historyMp3Url: [],
      newPlayList: [{
        name: '',
        src: '',
        album:''

      }],
      mp3Url: null,
      historyArray: [],
      concertArray: [],
      concertId: null,
      dropDownChoices: dropDownChoices,
      artistName: ' ',
      years: [' '],
      yearChoice: ' ',
      currentSongTitle: '',
      currentSong: {} // can get currentSong.title, currentSong.album
      // TODO: find picture url
    }
    // this.getSearch('grateful_dead', '1970')
    console.log(this.state.newPlayList)

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
      // let scrubName = this.state.artistName.replace(/ [/]/g, '')
// console.log(scrubName);
      let years = dropDownChoices[this.state.artistName] || [' ']
      this.setState({
        years: years
      })
    })
  }
  submitArtistName (e) {
    e.preventDefault()
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
  }

  // change song to playlist song on click
  playListSong (song) {
    console.log(song)
    $('audio').attr('src', song.src)
    $('.currentSongName').text(song.name)
    $('.currentSongAlbum').text(song.album)

  }

  getSearch () {
    let scrubArtistName = this.state.artistName.replace(/ /g, '_')
    let scrubYearChoice = this.state.yearChoice.replace(/\//g, '')
    console.log('this', scrubYearChoice)
    let search1 = scrubArtistName + '+AND+year%3A' + scrubYearChoice
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
      // console.log(this.state.concertArray)
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
      let newPlayList = this.state.newPlayList
      // let currentSongTitle = firstSong.title.replace(/[><]/g, '')
      console.log(firstSong);
      let playListSongTitle = firstSong.title
      let updatedHistoryMp3Url = this.state.historyMp3Url.concat(baseUrl + dir + '/' + name)
      this.setState({
        mp3Url: baseUrl + dir + '/' + name,
        currentSong: firstSong,
        historyMp3Url: updatedHistoryMp3Url,
        newPlayList: newPlayList.concat({
          name: playListSongTitle,
          src: baseUrl + dir + '/' + name,
          album: firstSong.album
        })
        // currentSongTitle: currentSongTitle
      }, function () {
        // console.log(this.state.historyMp3Url)
        console.log('newPlayList', this.state.newPlayList)
      })
    })
  }
  nextSong () {
    this.getSearch()
  }

  render () {
    // let history = this.state.historyArray.map((name, url) => {
    //   return (
    //     <li key={url} onClick={() => console.log(url)}>
    //       {name}
    //     </li>
    //   )
    // })

    let playList = this.state.newPlayList.map((song, index) => {
      return (
        <p className='songsList' key={index} onClick={() => this.playListSong(song)}>
          {song.name}
        </p>
      )
    })


    let songInfo =
      <div>
        <h3 className='songInfoTitle'>Song Info</h3>
        <p className='currentSongName'>{this.state.currentSong.title}</p>
        <p className='currentSongAlbum'>{this.state.currentSong.album}</p>

      </div>
      // $('playerContainer').children().css('width', '100%')

    return (
      <div className='App'>
        <h2 className='title'><span>CRUNCH</span> FM</h2>

        <Grid>
          <div className='mainContainer'>
            <Col sm={4}>
            <h3 className='station'>Station</h3>

              <div className='filter'>

                <Filter
                  dropDownChoices={this.state.dropDownChoices}
                  years={this.state.years}
                  yearChoice={this.state.yearChoice}
                  setArtistName={this.setArtistName}
                  submitArtistName={this.submitArtistName}
                  setYearChoice={this.setYearChoice}
                  submitYearChoice={this.submitYearChoice}
        />
              </div>
              <Player
                getSearch={this.getSearch}
                nextSong={this.nextSong}
                songUrl={this.state.mp3Url} />
              <p className='crunchyGrooves'>Stay crunchy!</p>

            </Col>
            <Col sm={4}>
            <h3 className='playListTitle'>Playlist</h3>

              <div className='playList'>
                <div className='playListSongs'>{playList}</div>
              </div>
            </Col>
            <Col sm={4}>

              <div className='station'>
                <div className='songInfo'>
                  {songInfo}
                </div>
              </div>
            </Col>

          </div>
        </Grid>
        <div className='playerContainer'>

          {/* <Audio
          width={800}
          height={400}
          autoPlay={true}
          playlist={this.state.newPlayList}
          style={{
            backgroundColor: '',
            color: 'inherit',
            position: 'fixed',
            bottom: '0',
            opacity: '0.2'
          }}
          /> */}
        </div>
      </div>
    )
  }
}

export default Home
