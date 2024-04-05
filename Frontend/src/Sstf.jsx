import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Sstf = () => {
  const [trackNos, setTrackNos] = useState('');
  const [startTrack, setStartTrack] = useState('');
  const [endTrack, setEndTrack] = useState('');
  const [headerPosition, setHeaderPosition] = useState('');
  const [finalQueue, setFinalQueue] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
  // Create and update the graph when finalQueue changes
  const ctx = document.getElementById('diskGraph');
  if (finalQueue.length > 0) {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: finalQueue.length }, (_, i) => `Step ${i + 1}`),
        datasets: [{
          label: 'Disk Head Position',
          data: finalQueue,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Step',
              color: 'white' // Set x-axis title color to white
            },
            ticks: {
              color: 'white' // Set x-axis ticks color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)' // Set x-axis grid color to white with opacity
            }
          },
          y: {
            title: {
              display: true,
              text: 'Track Number',
              color: 'white' // Set y-axis title color to white
            },
            ticks: {
              color: 'white' // Set y-axis ticks color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)' // Set y-axis grid color to white with opacity
            }
          }
        }
      }
    });
    return () => chart.destroy(); // Cleanup on component unmount
  }
}, [finalQueue]);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let tracks = trackNos.split(',').map(track => parseInt(track.trim()))
      console.log(Math.max(...tracks))
      if (parseInt(endTrack)<Math.max(...tracks)){
        setError("End Track should be greater than the maximum track number in queue");
      }else{const response = await axios.post('http://localhost:3000/api/sstf/simulate', {
        Track_nos: trackNos.split(',').map(track => parseInt(track.trim())),
        Start_Track: parseInt(startTrack),
        End_Track: parseInt(endTrack),
        Header_position: parseInt(headerPosition)
      });
      setFinalQueue(response.data['final queue']);
      setError('');}
    } catch (err) {
      setError('Invalid data');
      console.error(err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Shortest Seek Time First Algorithm</h1>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='text-left items-start flex-col space-y-6'>
          <div className='flex space-x-4'>
            <label className='font-semibold'>Track Numbers (comma-separated):</label>
            <input type="text" value={trackNos} onChange={e => setTrackNos(e.target.value)} required 
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black" />
          </div>
          <div className='flex space-x-4'>
            <label className='font-semibold'>Start Track:</label>
            <input type="number" value={startTrack} onChange={e => setStartTrack(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black" />
          </div>
          <div className='flex space-x-4'>
            <label className='font-semibold'>End Track:</label>
            <input type="number" value={endTrack} onChange={e => setEndTrack(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black" />
          </div>
          <div className='flex space-x-4'>
            <label className='font-semibold'>Header Position:</label>
            <input type="number" value={headerPosition} onChange={e => setHeaderPosition(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Simulate</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div className="w-500 h-500 flex justify-center items-center">
        <canvas id="diskGraph" width="500" height="500"></canvas>
      </div>
      <h3 className='text-center font-bold'>Final Queue:</h3>
      <ul>
        {finalQueue.map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ul>
    </div>
  );
  
};

export default Sstf;