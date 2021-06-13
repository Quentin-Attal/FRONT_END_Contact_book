import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import RightPanel from './RightPanel';
import CardUserList from './DisplayCardUser'
import { initialState, reducer } from './Reducer';
import { ReducerStateType, userDetailsActionType } from '../type/userDetailsType';
import { getRequest } from './api/apiRequest';
import apiUrl from './api/url';
import Pagination from "react-js-pagination";

const AppContext = createContext<AppContextValue | null>(null);

export const useAppContext = (): AppContextValue => {
  const AppContextValue = useContext(AppContext)

  if (!AppContextValue) {
    throw new Error("Toast context used outside of a toast context provider")
  }

  return AppContextValue
}

interface AppContextValue {
  state: ReducerStateType
  dispatch: (content: userDetailsActionType) => void
}

function App() {

  const [widthSideNav, setWidthSideNav] = useState<"0px" | "33vw">("0px")
  const [isNew, setIsNew] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [searchTemp, setSearchTemp] = useState("")
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getRequest(apiUrl.USER + '?_page=1&_limit=5')
      .then(res => {
        const totalItem = res.headers.get('X-Total-Count')
        if (totalItem) {
          setTotal(parseInt(totalItem))
        }
        return res.json()
      })
      .then(
        res => {
          if (res.length && res.length > 0) {
            dispatch({ type: "init", payload: res })
          }
        }
      )
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    getRequest(apiUrl.USER + '?_page=' + page + '&_limit=5&q=' + search)
      .then(res => {
        const totalItem = res.headers.get('X-Total-Count')
        if (totalItem) {
          setTotal(parseInt(totalItem))
        }
        return res.json()
      })
      .then(
        res => {
          dispatch({ type: "init", payload: res })
        }
      )
      .catch(e => console.log(e))
  }, [page, search])

  return (
    <AppContext.Provider value={{ dispatch: dispatch, state: state }}>
      <div className="App">
        <header className="header">
          <input value={searchTemp}
            onChange={(e) => setSearchTemp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearch(searchTemp)
              }
            }}
            id="userSearch"
            type="text"
            alt="search"
            placeholder="Search for a user..." />
          <button id="New" onClick={() => { dispatch({ 'type': "changeId", payload: 0 }); setIsNew(true); setWidthSideNav('33vw'); }}>
            New
          </button>
        </header>
        <RightPanel
          isNew={isNew}
          widthSideNav={widthSideNav}
          close={() => setWidthSideNav('0px')} />
        <CardUserList open={() => { setIsNew(false); setWidthSideNav('33vw'); }} />
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          onChange={(e) => setPage(e)}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
