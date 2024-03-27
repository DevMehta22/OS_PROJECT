import React, { useState } from 'react';
import axios from 'axios';

const Srt = () => {
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [name, setname] = useState('');
  const [processes, setProcesses] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleAddProcess = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/srtn/add-process', {
        arrivalTime,
        burstTime,
        name 
      });
      setProcesses(response.data.process);
      console.log('Processes:', response.data.process); // Add this console log
    } catch (error) {
      console.error('Error adding process:', error);
    }
  };
  

  const handleRunSimulation = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/srtn/run-simulation');
      setSimulationResult(response.data);
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };

  const renderGanttChart = (simulationResult) => {
    if (!simulationResult || !simulationResult.completedProcess) {
      return null; // Return null if simulationResult is not available or completedProcess is undefined
    }
  
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6610f2', '#28a745', '#007bff', '#dc3545', '#ffc107']; 
    let totalBurstTime = 0;
    for (let i = 0; i < simulationResult.completedProcess.length; i++) {
      totalBurstTime += simulationResult.completedProcess[i].burstTime;
    }
  
    let startTime = 0; 
    const bars = simulationResult.completedProcess.map((process, index) => {
      const width = (process.burstTime / totalBurstTime) * 100;
      const color = colors[index % colors.length]; 
      const barStyle = {
        width: `${width}%`,
        background: color,
        color: '#fff',
        textAlign: 'center',
        border: '2px solid #333',
        position: 'relative',
      };
  
      // Calculate start time based on completion time of previous process
      let processStartTime = startTime;
      startTime += process.burstTime;
  
      return (
        <div key={index} style={barStyle}>
          <div>{process.name}</div>
          <div style={{textAlign:'left'}}>ST: {process.arrivalTime}</div>
          <div style={{textAlign:'right'}}>FT: {process.finishTime}</div>
        </div>
      ); 
    });
  
    return (
      <div style={{ display: 'flex', marginTop: '20px' }} className="gantt">
        {bars}
      </div>
    );
  };
  

  
  
  




  return (
    <div className="container mx-auto">
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-4">Process Scheduler</h1>
        <h1 className="text-3xl font-bold mb-4">SRTN</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Process Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Arrival Time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Burst Time"
            value={burstTime}
            onChange={(e) => setBurstTime(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            onClick={handleAddProcess}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Add Process
          </button>
          <button
            onClick={handleRunSimulation}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
          >
            Run Simulation
          </button>
        </div>
      </div>

      {simulationResult && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Simulation Results</h2>
          <p>Average Turnaround Time: {simulationResult.avgTAT}</p>
          <p>Average Waiting Time: {simulationResult.avgWaitingTime}</p>
          {renderGanttChart(simulationResult)}
          <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Process Name</th>
              <th className="border border-gray-400 px-4 py-2">Arrival Time</th>
              <th className="border border-gray-400 px-4 py-2">Burst Time</th>
              <th className="border border-gray-400 px-4 py-2"> Time</th>
              <th className="border border-gray-400 px-4 py-2">Turnaround Time</th>
              <th className="border border-gray-400 px-4 py-2">Waiting Time</th>
            </tr>
          </thead>
          <tbody>
        {simulationResult.completedProcess.map((process) => (
          <tr key={process.id}>
            <td className="border border-gray-400 px-4 py-2">{process.name}</td>
            <td className="border border-gray-400 px-4 py-2">{process.arrivalTime}</td>
            <td className="border border-gray-400 px-4 py-2">{process.burstTime}</td>
            <td className="border border-gray-400 px-4 py-2">{process.finishTime}</td>
            <td className="border border-gray-400 px-4 py-2">{process.turnaroundTime}</td>
            <td className="border border-gray-400 px-4 py-2">{process.waitingTime}</td> 
          </tr>
        ))}
        </tbody>
        </table>
        </div>
      )}

      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4">Processes</h2>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Process Name</th>
              <th className="border border-gray-400 px-4 py-2">Arrival Time</th>
              <th className="border border-gray-400 px-4 py-2">Burst Time</th>
              {/* <th className="border border-gray-400 px-4 py-2">Turnaround Time</th>
              <th className="border border-gray-400 px-4 py-2">Waiting Time</th> */}
            </tr>
          </thead>
          <tbody>
  {processes.map((process) => (
    <tr key={process.id}>
      <td className="border border-gray-400 px-4 py-2">{process.name}</td>
      <td className="border border-gray-400 px-4 py-2">{process.arrivalTime}</td>
      <td className="border border-gray-400 px-4 py-2">{process.burstTime}</td>
      
    </tr>
  ))}
</tbody>

        </table>
        

      </div>
    </div>
  );
};

export default Srt;