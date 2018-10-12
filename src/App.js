import React, { Component } from 'react';
// import Discogs from 'disconnect';
import './App.css';

import Title from './components/title';
import SearchBar from './components/searchbar';
import AlbumsList from './components/albumsList'
import _ from 'lodash';

const DISCOGS_KEY = "XBfovZdRndqwiqiMrnDiLhUQIKsyVHCigShEfits";
let Discogs = require('disconnect').Client;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { albums: [], query: "" };

  }

  discogsSearch(term) {
    const db = new Discogs({userToken: DISCOGS_KEY}).database();
    const results = document.querySelector(".card.results");
    term === "" ? results.style.display = "none" : results.style.display = "flex";
    return db.search(term)
      .then(data => data.results[0].id)
      .then(id => db.getArtistReleases(id))
      .then(albums => this.setState({ albums: albums.releases, query: term }))
  }

  render() {

    const throttledSearch = _.debounce((term) => { this.discogsSearch(term) }, 500);

    return (
      <div className="App">
        <div className="banner">
          <div className="card header">
            <Title />
            <SearchBar onSearchTermChange={throttledSearch} />
          </div>
          <div className="card results">
            <h3>Here are {this.state.query}'s recordings :</h3>
            <AlbumsList albums={this.state.albums} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
