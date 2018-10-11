import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }


  render() {
    return (
      <div className="search">
        <input
          placeholder="Type in a name"
          value={this.state.term}
          onChange={event => this.handleValue(event.target.value)} />
      </div>
    )
  }

  handleValue(term) {
    this.setState({ term });
  }
}

export default SearchBar;
