import React, { Component } from 'react';
// import Discogs from 'disconnect';
import './App.css';
import _ from 'lodash';
import $ from 'jquery';

import Title from './components/title';
import SearchBar from './components/searchbar';
import AlbumsList from './components/albumsList'

// const process = { env: { NODE_ENV: "development"} };
// const DISCOGS_KEY = process.env.DISCOGS_KEY;
const DISCOGS_KEY = "XBfovZdRndqwiqiMrnDiLhUQIKsyVHCigShEfits";

let Discogs = require('disconnect').Client;
// let Spotify = require('spotify-web-api-js');

class App extends Component {

  getSpotifyAccessToken() {
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://accounts.spotify.com/api/token",
      "method": "POST",
      "headers": {
        "Authorization": "Bearer BQCGxw32dFoRzlGZsQJqCyZfjLaArlQvkYMPPzV8Sn9MQFOg920QbRttXt_V68DCmix9tNd0zK5CrXF0Gvw",
        "Cache-Control": "no-cache",
        "Postman-Token": "7b0a4e46-21cf-4406-be2a-35bed427b1ac"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      albums: [], query: "",
      selectedAlbum: "",
      status: "Loading...",
      error: false
    };
  }

  discogsSearch(term) {
    // Get the results div, and hide it until a search is triggered
    const resultsDiv = document.querySelector(".card.results");
    term === "" ? resultsDiv.style.display = "none" : resultsDiv.style.display = "flex";
    console.log(process.env.DISCOGS_KEY);
    // API call to Discogs
    const db = new Discogs({userToken: DISCOGS_KEY}).database();
    const queryResult = db.search(term)
      .then(data => {
        if (data.results[0] === undefined) {
          this.setState({status: `Sorry, no results for ${term}`, albums: []});
        } else {
          const albums = db.getArtistReleases(data.results[0].id, {per_page: 400})
            .then(albums => {
              const sortedAlbums = _.uniqBy(albums.releases, "id")
              this.setState({
                albums: sortedAlbums,
                query: term,
                error: true,
                status: `Here are ${sortedAlbums.length} recordings for ${_.startCase(term)} :` })
          });
          return albums;
        }})
    console.log(queryResult);
  }

  // spotifySearch(album, name) {
  //   const spotifyApi = new SpotifyWebApi();
  // }

  render() {

    const throttledSearch = _.debounce((term) => { this.discogsSearch(term) }, 500);

    return (
      <div className="App">
        <div className="container">
          <div className="card header">
            <Title />
            <SearchBar onSearchTermChange={throttledSearch} />
          </div>
          <div className="card results">
            <h3>{this.state.status}</h3>
            {this.state.albums ?
              <AlbumsList
                albums={this.state.albums}
                onAlbumSelect={selectedAlbum => this.setState({selectedAlbum})}
                selectedAlbum={this.state.selectedAlbum} />
              : null}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
