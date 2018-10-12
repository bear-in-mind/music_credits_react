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

  return(
      <div className="list">
        {albumItems}
      </div>
  );
}


export default AlbumsList;
