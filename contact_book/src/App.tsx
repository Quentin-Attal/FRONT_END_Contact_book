import React, { useReducer, useState } from 'react';
import './App.css';
import RightPanel from './RightPanel';
import { initialState, reducer } from './Reducer';
import CardUser from './DisplayCardUser';

function App() {

  const [widthSideNav, setWidthSideNav] = useState<"0px" | "33vw">("0px")
  const [isNew, setIsNew] = useState(true)
  const [id, setId] = useState<number>(0)
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <header className="header">
        <input id="userSearch" type="text" alt="search" placeholder="Search for a user..." />
        <button id="New" onClick={() => { setWidthSideNav('33vw'); setIsNew(true); setId(0) }}>
          New
        </button>
      </header>
      <RightPanel
        isNew={isNew}
        widthSideNav={widthSideNav}
        id={id}
        close={() => { setWidthSideNav('0px'); }} />
      <div>
        {state.userDetails.map((item) => <CardUser item={item} event={(id) => setId(id)} />)}
      </div>
    </div>
  );
}

export default App;
