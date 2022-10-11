import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/")
  })

  // useEffect(()=>{
  //   fetch("/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   ).finally(
  //     console.log("please")
  //   )

  // }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>

          {(typeof data.members === 'undefined') ? (
            <p>loading...</p>
          ) : (
            data.members.map((member, i) => (
              <p key={i}>{member}</p>
            ))
          )}
        </div>        
      </header>
    </div>
  );
}

export default App;