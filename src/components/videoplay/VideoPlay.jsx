import ClipLoader from 'react-spinners/ClipLoader'
import YouTube from 'react-youtube'
import './VideoPlay.css'
import { useDataContext } from '../context/DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PlaylistModal } from '../playlistmodal/PlaylistModal'
import { useAuth } from '../context/AuthProvider'
import { LoginModal } from '../modal/LoginModal'
import axios from 'axios'
import { REACT_APP_BASE_URL } from '../../utils/server'
import { addToHistory, removeFromLiked } from '../../services/videosServices'
import { addToLiked } from '../../services/videosServices'

export function VideoPlay() {
  // const [input, setInput] = useState("");
  // const [notes, setNotes] = useState([]);
  const { dispatch, state, modal, setModal } = useDataContext()
  const navigate = useNavigate()
  const { login } = useAuth()
  let { videoId } = useParams()
  const [data, setData] = useState()
  const [allData, setAllData] = useState()

  useEffect(() => {
    ;(async function () {
      const res = await axios.get(`${REACT_APP_BASE_URL}/videos`)
      setAllData(res.data.videos)
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      console.log('check')
      const res = await axios.get(`${REACT_APP_BASE_URL}/videos/${videoId}`)
      setData(res.data.video)
    })()
  }, [videoId])

  useEffect(() => {
    state.liked = []
    ;(async function () {
      console.log('hi')
      const {
        status,
        data: { liked },
      } = await axios.get(`${REACT_APP_BASE_URL}/liked`)
      if (status === 200) {
        dispatch({ type: 'SET_LIKED_VIDEOS', payload: liked })
      }
    })()
  }, [])

  console.log(state.liked)

  function apiHandler(item, dispatch) {
    state.liked.find((prev) => prev._id === item._id)
      ? removeFromLiked(item, dispatch)
      : addToLiked(item, dispatch)
  }

  return data ? (
    data.map((item) => {
      if (item._id === videoId) {
        return (
          <div>
            {modal && <div className="modal-fade"></div>}{' '}
            <div>
              {modal && <LoginModal />}
              <YouTube
                onPlay={() => {
                  addToHistory(item)
                  dispatch({ type: `ADD_TO_HISTORY`, payload: item })
                }}
                videoId={item.youtubeId}
                className={state.displayNav ? 'video-nav-hidden' : 'video'}
              ></YouTube>
              <div
                className={
                  state.displayModal
                    ? 'channel-details-1'
                    : 'channel-details-hidden'
                }
              >
                <span className="col">
                  <h2 className="title video-name">{item.name}</h2>
                  <span className="title gray last-row inc">
                    {item.views} <span className="circle">.</span> {item.date}
                  </span>
                </span>
                <span className="like">
                  <span>
                    <i
                      className="fas fa-thumbs-up like padding-1"
                      onClick={() =>
                        login ? apiHandler(item, dispatch) : setModal(true)
                      }
                      style={
                        state.liked.find((prev) => prev._id === item._id)
                          ? { color: 'red' }
                          : {}
                      }
                    ></i>
                  </span>
                  <span>
                    <i
                      className="fas fa-bookmark save"
                      onClick={() =>
                        login
                          ? dispatch({ type: 'TOGGLE_SAVE', payload: item })
                          : setModal(true)
                      }
                      style={
                        state.saved.includes(item) ? { color: 'red' } : null
                      }
                    ></i>
                  </span>
                  <span
                    className="playlist"
                    onClick={() =>
                      login ? dispatch({ type: 'SHOW_MODAL' }) : setModal(true)
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      style={{
                        pointerEvents: 'none',
                        width: '1.5em',
                        height: '1.5em',
                      }}
                    >
                      <g class="style-scope yt-icon">
                        <path
                          d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"
                          class="style-scope yt-icon"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </span>
                {state.displayModal && <PlaylistModal item={item} />}
              </div>
            </div>
            <div className="relative">
              <div className="v">
                {allData ? (
                  allData.map((items) => {
                    if (items._id !== videoId) {
                      return (
                        <div className="video-style-1">
                          <div className="videos">
                            <img
                              src={items.thumbnail}
                              className="thumbnail"
                              onClick={() =>
                                navigate(`/videos/${items._id}`, {
                                  replace: true,
                                })
                              }
                            ></img>
                          </div>
                          <div className="details-1">
                            <div className="row">
                              <div className="channel-details">
                                <span className="title video-name">
                                  {items.name}
                                </span>
                                <span className="title gray padding-9">
                                  {items.channelName}
                                </span>
                                <span className="title gray last-row">
                                  {items.views}{' '}
                                  <span className="circle">.</span> {item.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                ) : (
                  <div className="spinner">
                    <ClipLoader color={'black'} size={50} />
                  </div>
                )}{' '}
              </div>
            </div>
          </div>
        )
      }
    })
  ) : (
    <div className="spinner">
      <ClipLoader color={'black'} size={50} />
    </div>
  )
}
