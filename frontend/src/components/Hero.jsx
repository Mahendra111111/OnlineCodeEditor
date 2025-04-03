import { useState } from "react";
import "./Hero.css";

export default function HeroSection() {
  return (
    <section
      id='home'
      className='hero relative w-full h-screen flex items-center justify-center overflow-hidden'
    >
      <div className='relative w-full h-full'>
        <img
          src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D'
          alt='Laptop with code'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      </div>

      <div className='text-container absolute  text-white text-center z-10'>
        <h2 className='text-3xl font-bold p-10'>
          <b>A Developer’s Paradise for Coding!</b>
        </h2>
        <p className='mt-2 flex-wrap pl-20 pr-20'>
          Welcome to the ultimate coding experience, where innovation meets
          efficiency. Our powerful code editor is designed to enhance your
          productivity, streamline your workflow, and bring your ideas to life
          effortlessly.
        </p>
      </div>
    </section>
  );
}
