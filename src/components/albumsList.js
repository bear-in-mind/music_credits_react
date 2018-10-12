import React from "react";
import Album from './album';

const AlbumsList = (props) => {
  const albumItems = props.albums
    .sort((a, b) => {
      return a.year < b.year ? 1 : -1;
    })
    .map(item => {
      return <Album album={item} key={item.id + item.role} />
    });

  console.log(albumItems);

  if (props.artist && props.albums) {
    return(
      <div className="results">
        <h3>Here are {props.artist}'s recordings :</h3>
        <div className="list">
          {albumItems}
        </div>
      </div>
    );
  }
  return null;
}


export default AlbumsList;
