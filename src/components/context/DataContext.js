import { createContext, useContext, useState } from 'react'
import { reducer } from '../reducer'
import { useReducer } from 'react'
import axios from 'axios'
import { REACT_APP_BASE_URL } from '../../utils/server'
import { useEffect } from 'react'

const DataContext = createContext()

const initialState = {
  videos: [],
  watchLater: [],
  liked: [],
  saved: [],
  flag: [],
  displayModal: false,
  displayNav: true,
  displayActions: true,
  playObj: [],
  history: [],
  show: false,
}

export function DataProvider({ children }) {
  const [modal, setModal] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [data, setData] = useState()

  useEffect(() => {
    setAllVideos()
  }, [])

  async function setAllVideos() {
    const res = await axios.get(`${REACT_APP_BASE_URL}/videos`)
    if (res.status === 200) {
      dispatch({ type: 'INITIALIZE_ALL_VIDEOS', payload: res.data.videos })
    }
  }

  return (
    <DataContext.Provider
      value={{ dispatch, state, modal, setModal, data, setData }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}
