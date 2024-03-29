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
                text: 'Step'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Track Number'
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
      const response = await axios.post('http://localhost:3000/api/sstf/simulate', {
        Track_nos: trackNos.split(',').map(track => parseInt(track.trim())),
        Start_Track: parseInt(startTrack),
        End_Track: parseInt(endTrack),
        Header_position: parseInt(headerPosition)
      });
      setFinalQueue(response.data['final queue']);
      setError('');
    } catch (err) {
      setError('Invalid data');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shortest Seek Time First ALgorithm</h1>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='text-left items-start flex-col space-y-6'>

        <div className=' flex space-x-4'>
        <label className='font-semibold'>
          Track Numbers (comma-separated):  
          </label>
          <input type="text" value={trackNos} onChange={e => setTrackNos(e.target.value)} required 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
       
        </div>
        <div className=' flex space-x-4'>
        <label className='font-semibold'>
          Start Track:
          </label>
          <input type="number" value={startTrack} onChange={e => setStartTrack(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
       
        </div>
        
        <div className=' flex space-x-4'>
        <label className='font-semibold'>
          End Track:
        </label>
          <input type="number" value={endTrack} onChange={e => setEndTrack(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
        </div>
        
        <div className=' flex space-x-4'>
        <label className='font-semibold'>
          Header Position:
        </label>
          <input type="number" value={headerPosition} onChange={e => setHeaderPosition(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
     </div>
      
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Simulate</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div style={{width:'500px', height:'500px', alignItems:'center'  }}>
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
