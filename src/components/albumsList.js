import React from "react";
import Album from './album';

const AlbumsList = (props) => {
  const albumItems = props.albums.map(item => {
      return <Album album={item} key={item.id + item.role} />
    });

  console.log(props.albums);

  return(
    <div className="list">
      {albumItems}
    </div>
  )
}


export default AlbumsList;
