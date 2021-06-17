import "./Home.css";
import { useDataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../context/AuthProvider";
import { LoginModal } from "../modal/LoginModal";

export function Home() {
  const { login } = useAuth();
  const { setModal, modal, dispatch, state } = useDataContext();

  return (
    <div>
      {modal && <div className="modal-fade"></div>} {modal && <LoginModal />}
      <div
        className="video-listing-1"
        style={
          state.displayNav
            ? { marginLeft: "-10em", transition: "350ms" }
            : { marginLeft: "unset", transition: "350ms" }
        }
      >
        {state.videos.length > 0  ? (
          state.videos?.map((item) => (
            <div className="video-style" key={item._id}>
              <Link to={`videos/${item._id}`}>
                <div className="videos">
                  <img
                    src={item.thumbnail}
                    className="thumbnail"
                    onClick={() => dispatch({ type: "TOGGLE_NAV_2" })}
                  ></img>
                </div>
              </Link>
              <div className="details">
                <div className="row">
                  <img src={item.img} className="img-round"></img>
                  <div className="channel-details">
                    <span className="title video-name">{item.name}</span>
                    <span className="title gray padding-9">
                      {item.channelName}
                    </span>
                    <span className="title gray last-row">
                      {item.views} <span className="circle">.</span> {item.date}
                    </span>
                  </div>
                </div>
                <span
                  className="ellipsis"
                  onClick={() =>
                    dispatch({ type: "TOGGLE_ACTIONS", payload: item })
                  }
                >
                  <i class="fas fa-ellipsis-v"></i>
                </span>
              </div>
              <div
                className="cta"
                style={
                  state.flag.includes(item)
                    ? { display: "flex" }
                    : { display: "none" }
                }
              >
                <span
                  onClick={() => {
                    login
                      ? dispatch({ type: "ADD_TO_WATCH_LATER", payload: item })
                      : setModal(true);
                  }}
                >
                  Save to Watch Later
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner">
            <ClipLoader color={"black"} size={50} />
          </div>
        )}
      </div>
    </div>
  );
}
