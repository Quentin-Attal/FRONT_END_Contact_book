import React, { createContext, useContext, useReducer, useState } from 'react';
import './App.css';
import RightPanel from './RightPanel';
import CardUserList from './DisplayCardUser'
import { initialState, reducer } from './Reducer';
import { ReducerStateType, userDetailsActionType } from '../type/userDetailsType';

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
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ dispatch: dispatch, state: state }}>
      <div className="App">
        <header className="header">
          <input id="userSearch" type="text" alt="search" placeholder="Search for a user..." />
          <button id="New" onClick={() => { setWidthSideNav('33vw'); setIsNew(true); dispatch({ 'type': "changeId", payload: 0 }) }}>
            New
          </button>
        </header>
        <RightPanel
          isNew={isNew}
          widthSideNav={widthSideNav}
          close={() => { setWidthSideNav('0px'); }} />
        <CardUserList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
