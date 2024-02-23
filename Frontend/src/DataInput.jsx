import React, { useState } from 'react';
import axios from 'axios';



const DataInput = () => {
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [processes, setProcesses] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleAddProcess = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/add-process', { arrivalTime, burstTime });
      setProcesses(response.data.process);
    } catch (error) {
      console.error('Error adding process:', error);
    }
  };

  const handleRunSimulation = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/run-simulation');
      setSimulationResult(response.data);
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-4">Process Scheduler</h1>
        <h1 className="text-3xl font-bold mb-4">SRTN</h1>
        <div className="flex space-x-4">
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
        </div>
      )}

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Processes</h2>
        <ul>
          {processes.map((process) => (
            <li key={process.id}>
              Process {process.id}: Arrival Time - {process.arrivalTime}, Burst Time - {process.burstTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataInput;
