import React from 'react';
import logo from './logo.svg'

export default function Title() {
  return (
    <>
      <div className="logos">
        <img
          src={logo}
          alt="vynil"
          className="App-logo"
          id="logo-left"
          height="50px"
          width="50px"/>
        <img
          src={logo}
          alt="vynil"
          id="logo-right"
          className="App-logo"
          height="50px"
          width="50px"/>
      </div>
      <h1>The AutoDiscoTool</h1>
      <h2>Get anyone's discography</h2>
    </>
  )
}
