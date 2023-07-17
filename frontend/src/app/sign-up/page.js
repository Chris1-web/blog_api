"use client";
import React, { useState } from "react";
import style from "./page.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [blog, setBlog] = useState("");
  const [password, setPassword] = useState("");

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeBlog(e) {
    setBlog(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  async function Signup(e) {
    e.preventDefault();
    const data = { username, blog, password };
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    console.log(data);
  }

  return (
    <div className={style.sign_up}>
      <h1>Sign Up</h1>
      <form className={style.form} onSubmit={Signup}>
        <div>
          <label>Username</label>
          <input
            className={style.input}
            type="text"
            value={username}
            onChange={changeUsername}
          />
        </div>
        <div>
          <label>Genre</label>
          <input
            className={style.input}
            type="text"
            value={blog}
            onChange={changeBlog}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className={style.input}
            type="password"
            value={password}
            onChange={changePassword}
          />
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
}
