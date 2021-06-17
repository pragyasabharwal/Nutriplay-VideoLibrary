import { useParams } from "react-router";
import YouTube from "react-youtube";
import { useDataContext } from "../context/DataContext";

export const Playlist = () => {
  const { name } = useParams();
  const { state } = useDataContext();
  console.log(name);
  return (
    <>
      <span className="title-history">{name}</span>
      <div className="history">
      {state.playObj.map((item) =>
        item.name === name
          ? item.videos.map((vid) => <YouTube videoId={vid.id} className="videos-history"></YouTube>)
          : null
      )}
      </div>
    </>
  );
};
