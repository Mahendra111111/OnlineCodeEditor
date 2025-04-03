import React from "react";
import Headers from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Service from "../components/Service";
import Contact from "../components/Contact";

function Front() {
  return (
    <div>
      <div className='min-h-screen bg-white text-gray-900 transition-all'>
        <Headers />
        <Hero id="home" />
        <About id="about"/>
        <Service id="services" />
        <Contact id="contact"/>
        <footer className='bg-gray-900 text-white text-center p-6'>
          <p>&copy; 2025 Brand. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Front;
