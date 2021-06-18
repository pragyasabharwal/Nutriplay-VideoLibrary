import { useDataContext } from "../context/DataContext";
import YouTube from "react-youtube";
import "./Library.css";

export const Library = () => {
  const { state } = useDataContext();
  return (
    <div className="library">
      <div className="history-library-div">
        <span className="title-history-library">
          <i class="fas fa-history"></i> History{" "}
        </span>
        <div className="history-library">
          {state.history
            .slice(
              Number(state.history.length - 3),
              Number(state.history.length)
            )
            .map((item) => (
              <div>
                <YouTube videoId={item.youtubeId} className="videos-history-library" />
              </div>
            ))}
        </div>
      </div>
      <div className="history-library-div-1">
        <span className="title-history-library">
          <i class="fas fa-clock"></i> Watch Later{" "}
        </span>
        <div className="history-library">
          {state.watchLater
            .slice(
              Number(state.watchLater.length - 3),
              Number(state.watchLater.length)
            )
            .map((item) => (
              <div>
                <YouTube videoId={item.youtubeId} className="videos-history-library" />
              </div>
            ))}
        </div>
      </div>
      <div className="history-library-div-1">
        <span className="title-history-library">
          <i class="far fa-thumbs-up"></i> Liked videos
        </span>
        <div className="history-library">
          {state.liked
            .slice(Number(state.liked.length - 3), Number(state.liked.length))
            .map((item) => (
              <div>
                <YouTube videoId={item.youtubeId} className="videos-history-library" />
              </div>
            ))}
        </div>
      </div>
      <div>
        {state.playObj.map((item) => {
          return (
            <div className="history-library-div-1">
              <span className="title-history-library">{item.name}</span>
              <div className="history-library">
                {item.videos.map((item) => (
                  <div>
                    <YouTube
                      videoId={item}
                      className="videos-history-library"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
