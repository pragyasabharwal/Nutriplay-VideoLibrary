import { useState } from "react";
import { useDataContext } from "../context/DataContext";
import "./PlaylistModal.css";

export function PlaylistModal({ item }) {
  const { dispatch, state } = useDataContext();
  const [playlist, setPlaylist] = useState("");
  const [playlistArr, setPlaylistArr] = useState([])
  console.log ('state being changed is..', state.playObj);

  return (
    <div className="modal">
      <div class="modal-header">
        <span className="heading">Save to</span>
        <span
          class="modal-close padding-2"
          onClick={() => {
            dispatch({ type: "CLOSE_MODAL" });
          }}
        >
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div class="modal-body">
        <span className="check-list">
          <input
            type="checkbox"
            checked={state.watchLater.includes(item) ? true : false}
            onClick={() => {
              dispatch({ type: "ADD_TO_WATCH_LATER", payload: item });
            }}
          ></input>
          Watch Later
        </span>
        {state.playObj.map((items) => {
          return (
            <div className="check-list">
              <input type="checkbox"
              checked={items.videos.includes(item)}
              onClick={() => {
             dispatch({ type: "ADD_TO_EXISTING_PLAYLIST", payload: {item, playlist: items.name} });
              }}

               />
               {items.name}
            </div>
          );
        })}
      </div>
      <div class="padding-1 footer">
        <span>
          <input
            autoFocus
            placeholder={`+ Create new playlist`}
            value={playlist}
            onChange={(e) => {
              setPlaylist(e.target.value);
            }}
          ></input>
          <button
            onClick={() =>{
              setPlaylist("")
              setPlaylistArr((prev)=> prev.concat(playlist))
              dispatch({ type: "ADD_TO_PLAYLIST", payload: { playlist, item } })}
            }
            className="button-primary-1 create"
          >
            +
          </button>
        </span>
      </div>
    </div>
  );
}
