import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Srt from './Srt'
import Home from './Home';
import ProducerConsumer from './ProducerConsumer';
import Sstf from './Sstf';
import Opr from './Opr';
// import {GanttChartView} from './DlhSoft.ProjectData.GanttChart.React.Components'; 

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/srtn" element={<Srt />} />
        <Route path="/producerconsumer" element={<ProducerConsumer />} />
        <Route path="/sstf" element={<Sstf />} />
        <Route path="/opr" element={<Opr />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
