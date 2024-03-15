import React, { useState } from 'react';
import axios from 'axios';

const ProducerConsumer = () => {
  const [items, setItems] = useState('');
  const [count, setCount] = useState('');
  const [output, setOutput] = useState([]);

  const simulate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/prodcom/simulate', { items: items.split(','), count: parseInt(count) });
      setOutput(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Enter items (comma-separated)"
          className="border p-2 mr-2"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter count"
          className="border p-2 mr-2"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={simulate}
        >
          Simulate
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Output:</h2>
        <ul>
          {output.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProducerConsumer;
