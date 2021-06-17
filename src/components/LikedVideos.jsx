import { useDataContext } from "../components/context/DataContext";
import YouTube from "react-youtube";

export function LikedVideos() {
  const { state, dispatch } = useDataContext();

  return (
    <>
      <span className="title-history"> Liked Videos </span>
      <div className="history">
        {state.liked.map((item) => (
          <div>
            <YouTube
              onPlay={() => dispatch({ type: `ADD_TO_HISTORY`, payload: item })}
              videoId={item?.youtubeId}
              className="videos-history"
            />
          </div>
        ))}
      </div>
    </>
  );
}
