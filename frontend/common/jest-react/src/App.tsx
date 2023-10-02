import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Users from "./Users";
import NotFound from './NotFound';
import AppRouter from "./Router";

function App() {
  return (
      <div className="App">
          <AppRouter/>
      </div>
  );
}

export default App;
