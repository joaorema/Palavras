import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './components/navBar'
import {Routes, Route} from 'react-router-dom'
import './css/App.css'
import './css/Footer.css'
import GamePage from './Pages/GamePage'
import PalavrasPage from './Pages/Palavras'
import ConexaoPage from './Pages/Conexao'
import Footer from './components/footer'
import LoginPage from './Pages/login'
import RegisterPage from './Pages/registerPage'
import WordleGame from './Wordle'
import ProfilePage from './Pages/Profile'
import ConnectionGame from './connections'
import WordleLevelPage from './Pages/WordleLevel'
import ConnectionLevelPage from './Pages/ConnetionLevel'

function App() {
  return (
    <div className="app-container bg-bg1">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/palavras" element={<PalavrasPage />} />
          <Route path="/conexao" element={<ConnectionGame />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/wordlelevel" element={<WordleLevelPage></WordleLevelPage>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/wordle" element={<WordleGame />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="connectionlevel" element={<ConnectionLevelPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
