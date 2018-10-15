import React from "react";

const Album = (props) => {
  let job = "";
  if (props.album.role === "Appearance") {
    job = "Musician";
  } else if (props.album.role === "Mixed by") {
    job = "Mixer / Engineer";
  } else {
    job = props.album.role;
  }

  return (
    <div className="album-card" onClick={() => props.onAlbumSelect(props.album)}>
      <img src={props.album.thumb} alt={props.album.title} />
      <h5><strong>{props.album.artist}</strong></h5>
      <h5><em>{props.album.title}</em> ({props.album.year})</h5>
      <h5 className="role">{job}</h5>
    </div>
  )
}

export default Album;
