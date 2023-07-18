import styles from "./page.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">BLOGGERS</Link>
      <ul>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}
