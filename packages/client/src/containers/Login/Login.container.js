import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import './Login.styles.css';

function Login() {
  const { logInWithEmailAndPassword, signInWithGoogle, loading, user } =
    useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);
  return (
    <div className="login-page">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          type="submit"
          className="login__btn login__google"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don&apos;t have an account? <Link to="/signup">Signup</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
