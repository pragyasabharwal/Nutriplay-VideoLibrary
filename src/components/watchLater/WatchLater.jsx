import { useDataContext } from "../context/DataContext";
import "./WatchLater.css";

import YouTube from "react-youtube";

export function WatchLater() {
  const { state, dispatch } = useDataContext();
  console.log(state);

  return (
    <>
      <span className="title-history"> Watch Later </span>
      <div className="history">
        {state.watchLater.map((item) => (
          <div>
            <YouTube
              videoId={item.id}
              onPlay={() => dispatch({ type: `ADD_TO_HISTORY`, payload: item })}
              className="videos-history"
            />
          </div>
        ))}
      </div>
    </>
  );
}
