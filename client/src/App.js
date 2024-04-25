import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from './components/Menu';

import UserProvider from './components/UserProvider'

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Menu/>
      </UserProvider>

    </div>
  );
}

export default App;
