"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Nav() {
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  async function getUser(token) {
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // if the response is not okay, remove token from localStorage
      if (!response.ok) {
        localStorage.removeItem("token");
        const text = await response.json();
        setLoading(false);
        showProfile(false);
        throw new Error(JSON.stringify(text));
      }

      // if response is okay, return result
      const result = await response.json();
      const { activeUser } = result;
      setUserData({ ...activeUser });
      setLoading(false);
      setShowProfile(true);
    } catch (error) {
      setShowProfile(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    if (token) {
      getUser(token);
    } else {
      setShowProfile(false);
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading && (
        <nav className={styles.nav}>
          <Link href="/">BLOGGERS</Link>
          <p>Loading...</p>
        </nav>
      )}
      {!loading && !showProfile && (
        <nav className={styles.nav}>
          <Link href="/">BLOGGERS</Link>
          <ul>
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
      {!loading && showProfile && (
        <nav className={styles.nav}>
          <Link href="/">BLOGGERS</Link>
          <ul>
            <li className={styles.userProfile}>
              <Link href={"/user" + "/" + userData._id}>
                {userData.username}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
  // return !showProfile ? (
  //   <nav className={styles.nav}>
  //     <Link href="/">BLOGGERS</Link>
  //     <ul>
  //       <li>
  //         <Link href="/login">Sign In</Link>
  //       </li>
  //       <li>
  //         <Link href="/sign-up">Sign Up</Link>
  //       </li>
  //     </ul>
  //   </nav>
  // ) : (
  //   <nav className={styles.nav}>
  //     <Link href="/">BLOGGERS</Link>
  //     <ul>
  //       <li className={styles.userProfile}>
  //         <Link href={"/user" + "/" + userData._id}>{userData.username}</Link>
  //       </li>
  //     </ul>
  //   </nav>
  // );
}
