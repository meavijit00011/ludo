import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { BoardContextProvider } from './context/BoardContext.tsx'
import { GameContextProvider } from './context/GameContext.tsx'
createRoot(document.getElementById('root')!).render(

  <GameContextProvider>
    <BoardContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BoardContextProvider>
  </GameContextProvider>

)
