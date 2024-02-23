import { useState } from 'react'

import './App.css'
import DataInput from './DataInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
     <DataInput />
      </div>
    </>
  )
}

export default App
