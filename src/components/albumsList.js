import React from "react";
import Album from './album';
// import SpotifyPlayer from "./spotify_player"
import _ from 'lodash';

const AlbumsList = (props) => {
  const albumItems = _.uniqBy(props.albums, "id")
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.name < b.name ? 1 : -1;
      } else {
        return a.year < b.year ? 1 : -1;
      }
    })
    .map(item => {
      return <Album
        album={item}
        key={item.id + item.role}
        onAlbumSelect={props.onAlbumSelect}/>
    });

  console.log(albumItems);

  return(
      <div className="list">
        {albumItems}
      </div>
  );
}


export default AlbumsList;
