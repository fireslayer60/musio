import { useState } from 'react'

import './App.css'
import Header from './components/header/Header'
import Hero1 from './components/Hero1/Hero1'
import Hero2 from './components/Hero2/Hero2'
import Hero3 from './components/Hero3/Hero3'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <><Header ></Header>
      <Hero1 />
      <Hero2/>
      <Hero3/>
      </>
    
  )
}

export default App
