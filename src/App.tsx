import { Route, Routes } from 'react-router-dom'
import { History } from './History'
import { MainPage } from './MainPage'
import './styles/App.css'
import { Navbar } from './components/Navbar'


function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' index element={<MainPage />} />
        <Route path='/History' element={<History />} />
      </Routes>
    </>
  )
}

export default App
