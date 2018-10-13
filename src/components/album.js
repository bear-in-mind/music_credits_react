import React from "react";

const Album = (props) => {
  return (
    <div className="album-card" onClick={() => props.onAlbumSelect(props.album)}>
      <img src={props.album.thumb} alt={props.album.title} />
      <h5><strong>{props.album.artist}</strong></h5>
      <h5><em>{props.album.title}</em> ({props.album.year})</h5>
    </div>
  )
}

export default Album;
