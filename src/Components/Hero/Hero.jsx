import React from 'react';

const Hero = () => {
  return (
    <div
      className="flex items-center justify-center h-screen" // Added h-screen for full height
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center', // Optional: Center the background image
      }}
    >
      <h1 className="text-4xl font-bold text-white text-center">
        Welcome to Commando Gym
      </h1>
    </div>
  );
};

export default Hero;