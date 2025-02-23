import React from 'react';
import {Button } from '../components';

const Hero = () => {
  return (
    <div
      className="flex flex-col gap-4 items-center justify-center h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className=" items-center justify-center text-center ">
      <h1 className="text-5xl font-bold text-gray-100 md:text-5xl lg:text-6xl drop-shadow-lg">
        Welcome to <span className="text-green-500">Commando Gym</span>
      </h1>

      </div>
      <Button />
    </div>
  );
};

export default Hero;
