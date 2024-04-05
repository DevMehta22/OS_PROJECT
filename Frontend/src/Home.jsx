import React from 'react';
import { Link } from 'react-router-dom';
import producer from './assets/P&C.jpg';
import Disc from './assets/Disc.jpg';
import sstf from './assets/STRN.jpg';
import opr from './assets/OPR.jpg';

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
        <h1 className='text-3xl font-bold mb-4 text-center'>Simulator Mini Project</h1>
      <h1 className="text-left m-4 text-xl font-semibold">Choose an option:</h1>
      <div className="flex justify-between">
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4 transition-transform hover:scale-105">
          <img
            src= {sstf}
            alt="SRTN"
            className="w-full h-72  object-cover"
          />
          <div className="px-4 py-2">
            <Link
              to="/srtn"
              className="text-black justify-center items-center font-bold py-2 px-4 rounded transition-transform hover:scale-105"
            >
                <p className='text-center'>Shortest Remaining Time Next Algorithm</p>
              
            </Link>
          </div>
        </div>

        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4 transition-transform hover:scale-105">
          <img
            src= {producer}
            alt="Producer-Consumer"
            className="w-full h-72 object-cover"
          />
          <div className="px-4 py-2">
            <Link
              to="/producerconsumer"
              className="text-black justify-center text-center items-center font-bold py-2 px-4 rounded transition-transform hover:scale-105"
            >
              <p className='text-center'>Producer-Consumer bounded buffer problems with monitors</p>
            </Link>
          </div>
        </div>

        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4 transition-transform hover:scale-105">
          <img
            src= {Disc}
            alt="SSTF"
            className="w-full h-72  object-cover"
          />
          <div className="px-4 py-2">
            <Link
              to="/sstf"
              className="text-black justify-center items-center font-bold py-2 px-4 rounded transition-transform hover:scale-105 "
            >
                <p className='text-center'>Shortest seek time first disk scheduling Algorithm</p>
              
            </Link>
          </div>
        </div>

        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4 transition-transform hover:scale-105">
          <img
            src= {opr}
            alt="OPR"
            className="w-full h-72  object-cover"
          />
          <div className="px-4 py-2">
            <Link
              to="/opr"
              className="text-black justify-center items-center font-bold py-2 px-4 rounded transition-transform hover:scale-105 "
            >
                 <p className='text-center'>Optimal page replacement Algorithm</p>
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
