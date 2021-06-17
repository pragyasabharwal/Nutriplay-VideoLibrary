import axios from 'axios'
import { REACT_APP_BASE_URL } from '../utils/server'

export async function addToHistory(item) {
  const res = await axios.post(`${REACT_APP_BASE_URL}/history`, {
    item: item?._id,
  })
}

export async function addToLiked(item, dispatch) {
  const res = await axios.post(`${REACT_APP_BASE_URL}/liked`, {
    item: item?._id,
  })
  if (res.status === 200) {
    dispatch({ type: 'ADD_TO_LIKED', payload: item })
  }
}

export async function removeFromLiked(item, dispatch) {
  const res = await axios.delete(`${REACT_APP_BASE_URL}/liked`, {
    data: {
      item: item?._id,
    },
  })
  if (res.status === 204) {
    dispatch({ type: 'REMOVE_FROM_LIKED', payload: item })
  }
}

export async function addToSaved(item, dispatch) {
  const res = await axios.post(`${REACT_APP_BASE_URL}/saved`, {
    item: item?._id,
  })
  if (res.status === 200) {
    dispatch({ type: 'ADD_TO_SAVED', payload: item })
  }
}

export async function removeFromSaved(item, dispatch) {
  const res = await axios.delete(`${REACT_APP_BASE_URL}/saved`, {
    data: {
      item: item?._id,
    },
  })
  if (res.status === 204) {
    dispatch({ type: 'REMOVE_FROM_SAVED', payload: item })
  }
}

export async function setLikedVideos(dispatch) {
  const {
    status,
    data: { liked },
  } = await axios.get(`${REACT_APP_BASE_URL}/liked`)
  if (status === 200) {
    dispatch({ type: 'SET_LIKED_VIDEOS', payload: liked })
  }
}

export async function setSavedVideos(dispatch) {
  const {
    status,
    data: { saved },
  } = await axios.get(`${REACT_APP_BASE_URL}/saved`)
  if (status === 200) {
    dispatch({ type: 'SET_SAVED_VIDEOS', payload: saved })
  }
}
