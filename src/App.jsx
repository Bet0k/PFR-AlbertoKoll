import Navbar from './components/navbar'
import { useState } from 'react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    < Navbar />
    </>
  )
}

export default App