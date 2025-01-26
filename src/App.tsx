import { Route, Routes } from 'react-router'
import './App.css'
import LudoBoard from './components/LudoBoard'
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/gamePlay' element={<LudoBoard></LudoBoard>}></Route>
    
    </Routes>
  )
}

export default App
