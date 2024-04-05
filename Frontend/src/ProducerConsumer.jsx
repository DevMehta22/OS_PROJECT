import React, { useState } from 'react';
import axios from 'axios';

const ProducerConsumer = () => {
  const [items, setItems] = useState('');
  const [count, setCount] = useState('');
  const [output, setOutput] = useState([]);

  const simulate = async () => {
    try {
      setOutput(["Simulating..."]);
      const response = await axios.post('http://localhost:3000/api/prodcon/simulate', { items: items.split(','), count: parseInt(count) });
      setOutput(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '200vh', color: 'white' }}>

      <div className="container mx-auto">
        <div className='text-center'>
          <h1 className="text-3xl font-bold mb-4">Producer Consumer Bounded Buffer Problems with Monitors</h1>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center mt-14">
          <div>

          <label className='font-semibold mr-2 text-xl'>Enter items (comma-separated):</label>
          <input
            type="text"
            placeholder="Enter items (comma-separated)"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            style={{ backgroundColor: 'black', color: 'white', width: 'auto' }}
          />
          </div>
          <div>

          <label className='font-semibold mr-2 text-xl'>Number of Items to be consumed :</label>
          <input
            type="text"
            placeholder="Enter count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            style={{ backgroundColor: 'black', color: 'white', width: 'auto' }}
          />
          </div>
          <div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={simulate}
          >
            Simulate
          </button>
          </div>
        </div>
        <div className=" text-center mt-6">
          <h2 className="text-lg font-bold">Output:</h2>
          <ul className='mt-5'>
            {output.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProducerConsumer;
