import { useDataContext } from "../components/context/DataContext";
import YouTube from "react-youtube";

export function SavedVideos() {
  const { state, dispatch } = useDataContext();

  return (
    <>
        <span className="title-history"> Saved Videos </span>
        <div className="history">
          {state.saved.map((item) => (
            <div>
              <YouTube videoId={item.id} className="videos-history" 
              onPlay={()=>dispatch({type: `ADD_TO_HISTORY`, payload: item})}
              />
            </div>
          ))}
        </div>
    </>
  );
}
