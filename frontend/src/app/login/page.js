"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import style from "./page.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function Login(e) {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if the response is not okay, throw error
      if (!response.ok) {
        const text = await response.json();
        throw new Error(JSON.stringify(text));
      }

      // is user is logged in, store generated token in
      const result = await response.json();
      toast.success("user logged in successfully");
      localStorage.setItem("token", JSON.stringify(result.token));
      router.push("/");
    } catch (error) {
      const parsedError = JSON.parse(error.message);
      parsedError.errors.forEach((message) => {
        toast.error(message.msg);
      });
    }
  }

  return (
    <div className={style.login}>
      <h1>Log In</h1>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              border: "2px solid red",
              fontSize: "20px",
            },
          },
        }}
      />
      <form className={style.form} onSubmit={Login}>
        <div>
          <label>Username</label>
          <input
            className={style.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className={style.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
}
