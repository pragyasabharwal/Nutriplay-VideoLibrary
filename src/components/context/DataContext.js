import { createContext, useContext, useState } from 'react'
import { reducer } from '../reducer'
import { useReducer } from 'react'
import axios from 'axios'
import { REACT_APP_BASE_URL } from '../../utils/server'
import { useEffect } from 'react'

const DataContext = createContext()

const initialState = {
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

  useEffect(() => {
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

  return (
    <DataContext.Provider value={{ dispatch, state, modal, setModal }}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}
