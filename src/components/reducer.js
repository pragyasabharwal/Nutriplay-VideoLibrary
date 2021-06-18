import { v4 as uuid } from 'uuid'
export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCH_LATER':
      return state.watchLater.includes(action.payload)
        ? {
            ...state,
            watchLater: state.watchLater.filter(
              (prev) => prev !== action.payload,
            ),
          }
        : {
            ...state,
            watchLater: state.watchLater.concat(action.payload),
            flag: state.flag.filter((prev) => prev !== action.payload),
          }
    case 'CLOSE_MODAL':
      return {
        ...state,
        displayModal: false,
      }
    case 'SHOW_MODAL':
      return {
        ...state,
        displayModal: true,
      }
    case 'TOGGLE_ACTIONS':
      return {
        ...state,
        flag: state.flag.includes(action.payload)
          ? state.flag.filter((prev) => prev !== action.payload)
          : state.flag.concat(action.payload),
      }
    case 'TOGGLE_NAV':
      return { ...state, displayNav: !state.displayNav }
    case 'INITIALIZE_ALL_VIDEOS':
      return { ...state, videos: state.videos.concat(action.payload) }
    case 'ADD_TO_LIKED':
      return {
        ...state,
        liked: state.liked.concat(action.payload),
      }
    case 'REMOVE_FROM_LIKED':
      return {
        ...state,
        liked: state.liked.filter((prev) => prev._id !== action.payload._id),
      }
    case 'SET_LIKED_VIDEOS':
      return {
        ...state,
        liked: state.liked.concat(action.payload),
      }
    case 'SET_SAVED_VIDEOS':
      return {
        ...state,
        saved: state.saved.concat(action.payload),
      }
    case 'ADD_TO_SAVED':
      return {
        ...state,
        saved: state.saved.concat(action.payload),
      }
    case 'REMOVE_FROM_SAVED':
      return {
        ...state,
        saved: state.saved.filter((prev) => prev?._id !== action.payload?._id),
      }
    case 'SET_PLAYLIST_DATA':
      return {
        ...state,
        playObj: state.playObj.concat(action.payload),
      }
    case 'ADD_NEW_PLAYLIST':
      return {
        ...state,
        playObj: state.playObj.concat({
          name: action.payload.playlist,
          videos: [action.payload.item],
        }),
      }
    case 'ADD_OR_REMOVE_FROM_EXISTING_PLAYLIST':
      return {
        ...state,
        playObj: state.playObj.map((item) => {
          return item.name === action.payload.playlist
            ? {
                ...item,
                videos: item.videos.includes(action.payload.item)
                  ? item.videos.filter((vid) => vid !== action.payload.item)
                  : item.videos.concat(action.payload.item),
              }
            : item
        }),
      }
    case 'ADD_TO_HISTORY':
      return state.history.includes(action.payload)
        ? state
        : { ...state, history: state.history.concat(action.payload) }
    case 'CLEAR_HISTORY':
      return { ...state, history: [] }
    case 'SHOW_MORE':
      return { ...state, show: !state.show }
    default:
      return state
  }
}
