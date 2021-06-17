import { useDataContext } from "../context/DataContext";
import YouTube from "react-youtube";
import "./History.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { REACT_APP_BASE_URL } from "../../utils/server";
import axios from "axios";

export function History() {
  const { state, dispatch } = useDataContext();

  const [data, setData] = useState()

  useEffect(() => {
    (async function () {
      const res = await axios.get(`${REACT_APP_BASE_URL}/history`);
      setData(res.data.history.reverse());
    })();
  }, [data])

  return (
    data ? 
    <div className="grid-history">
      <div className="g">
        <span className="title-history"> History </span>
        <div className="history">
          {data?.map((item) => (
            <div>
              <YouTube videoId={item.youtubeId} className="videos-history" />
            </div>
          ))}
        </div>
      </div>
      <div className="d">
        <span onClick={() => dispatch({ type: "CLEAR_HISTORY" })}>
          <i class="fas fa-trash"></i>
          Clear all Watch History
        </span>
      </div>
    </div> :
    (
      <div className="spinner">
        <ClipLoader color={"black"} size={50} />
      </div>
  ))
}
