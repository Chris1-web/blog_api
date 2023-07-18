"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import style from "./page.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [blog, setBlog] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

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
      // if there response is not okay, throw error
      if (!response.ok) {
        const text = await response.json();
        throw new Error(JSON.stringify(text));
      }

      // if response is okay, return result, redirect to sign in page
      const result = await response.json();
      toast.success(result.message);
      router.push("/sign-in");
    } catch (error) {
      const parsedError = JSON.parse(error.message);
      parsedError.errors.forEach((message) => {
        toast.error(message.msg);
      });
    }
  }

  return (
    <div className={style.sign_up}>
      <h1>Sign Up</h1>
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
      <form className={style.form} onSubmit={Signup}>
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
          <label>Genre</label>
          <input
            className={style.input}
            type="text"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
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
        <button>Sign Up</button>
      </form>
    </div>
  );
}
