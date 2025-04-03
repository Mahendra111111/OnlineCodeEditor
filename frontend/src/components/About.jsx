import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className='about-container' id="about">
     
     <div className="left">
     <h2 className='heading'>About Us</h2>
      <p className='desc'>
        We are a passionate team of developers and designers committed to
        crafting high-quality digital solutions.
      </p>
     </div>

     <div className="right">
      <img src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlzdWFsJTIwc3R1ZGlvJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
     </div>
    </section>
  );
};

export default About;
