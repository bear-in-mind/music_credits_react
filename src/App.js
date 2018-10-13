import React, { Component } from 'react';
// import Discogs from 'disconnect';
import './App.css';
import _ from 'lodash';

import Title from './components/title';
import SearchBar from './components/searchbar';
import AlbumsList from './components/albumsList'

const DISCOGS_KEY = "XBfovZdRndqwiqiMrnDiLhUQIKsyVHCigShEfits";
let Discogs = require('disconnect').Client;

class App extends Component {

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
    // API call to Discogs
    const db = new Discogs({userToken: DISCOGS_KEY}).database();
    const queryResult = db.search(term)
      .then(data => {
        if (data.results[0] === undefined) {
          this.setState({status: `Sorry, no results for ${term}`, albums: []});
        } else {
          const albums = db.getArtistReleases(data.results[0].id)
            .then(albums => this.setState({
              albums: albums.releases,
              query: term,
              error: true,
              status: `Here are ${term}'s recordings` }));
          return albums;
        }})
    console.log(queryResult);
  }

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
              <AlbumsList albums={this.state.albums} onAlbumSelect={selectedAlbum => this.setState({selectedAlbum})} />
              : null}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
