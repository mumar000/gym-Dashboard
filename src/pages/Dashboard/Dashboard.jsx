import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
    <nav className=" bg-white  shadow-md rounded-lg z-10 ">
      <div className="container mx-auto flex items-center justify-center p-4">
        {/* Logo */}
        <Link to='/'>
        <h1 className="text-2xl font-bold text-gray-800 ">Commando Gym</h1>
        </Link>
        

        {/* Navigation Links */}
        <div className="flex  items-center text-gray-800   space-x-6">
          <Link 
            to="/form" 
            className="text-lg font-medium  transition ease duration-200"
          >
            Add a Customer
          </Link>
          <Link 
            to="/details" 
            className="text-lg font-medium   transition ease   duration-300"
          >
            Customer Details
          </Link>
          
        </div>
      </div>
    </nav>
    <div className='flex items-center justify-center'>
      {/* <h1>Welcome to Commando Gym Management System</h1> */}
    </div>
    </div>
  );
}
