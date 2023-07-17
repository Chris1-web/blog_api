export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div className="username">
          <label>Username</label>
          <input type="text" />
        </div>
        <div className="blog_type">
          <label>Genre</label>
          <input type="text" />
        </div>
        <div className="username">
          <label>Password</label>
          <input type="password" />
        </div>
      </form>
    </div>
  );
}
