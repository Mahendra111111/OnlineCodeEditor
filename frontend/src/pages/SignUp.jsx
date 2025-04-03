import React, { useState } from "react";
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";
import "./Signup.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
        } else {
          toast.error(data.msg);
        }
      });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={submitForm} className="form-container">
          <p className="logo">ez-Snippits</p>
          <br />

          <div className="w-full mb-3">
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
              className="input-field"
            />
          </div>

          <div className="w-full mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="input-field"
            />
          </div>

          <div className="w-full mb-3">
            <input
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              placeholder="Password"
              required
              className="input-field"
            />
          </div>

          <p className="text-gray-400 text-sm mt-3 self-start">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1 hover:underline">
              Login
            </Link>
          </p>

          <button className="w-full mt-4 p-3 bg-blue-500 text-white font-semibold rounded-md transition-all hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
