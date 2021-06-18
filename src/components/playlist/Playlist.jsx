import { useParams } from "react-router";
import YouTube from "react-youtube";
import { useEffect } from 'react'
import { useDataContext } from "../context/DataContext";
import { getPlaylistData } from "../../services/videosServices"

export const Playlist = () => {
  const { name } = useParams();
  const { state , dispatch} = useDataContext();
  console.log(name, state.playObj);

  return (
    <>
      <span className="title-history">{name}</span>
      <div className="history">
      {state.playObj.map((item) =>
        item.name === name
          ? item.videos.map((vid) => <YouTube videoId={vid} className="videos-history"></YouTube>)
          : null
      )}
      </div>
    </>
  );
};
