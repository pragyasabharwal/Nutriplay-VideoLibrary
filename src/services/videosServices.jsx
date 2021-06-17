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
  console.log(item._id)
  const res = await axios.delete(`${REACT_APP_BASE_URL}/liked`, {
    data : {
      item: item?._id
    }
  })
  if (res.status === 201) {
    dispatch({ type: 'REMOVE_FROM_LIKED', payload: item })
  }
}
