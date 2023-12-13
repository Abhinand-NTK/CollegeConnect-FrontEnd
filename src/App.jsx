import { useState } from 'react'
import Login from './features/Login/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import store from './app/store'
import { Provider } from 'react-redux'
import Register from './Components/Register/Register'
import Role from './Components/SelectRole/Role'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/signup' element={<Register/>}></Route>
            <Route path='/role' element={<Role/>}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
