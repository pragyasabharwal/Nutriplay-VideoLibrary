import { useDataContext } from "../components/context/DataContext";
import YouTube from "react-youtube";
import { useEffect } from "react";
import { setSavedVideos } from "../services/videosServices";

export function SavedVideos() {
  const { state, dispatch } = useDataContext();

  useEffect(() => {
    state.saved = []
    setSavedVideos(dispatch)
  }, [])

  return (
    <>
        <span className="title-history"> Saved Videos </span>
        <div className="history">
          {state?.saved.map((item) => (
            <div>
              <YouTube videoId={item?.youtubeId} className="videos-history" 
              onPlay={()=>dispatch({type: `ADD_TO_HISTORY`, payload: item})}
              />
            </div>
          ))}
        </div>
    </>
  );
}
