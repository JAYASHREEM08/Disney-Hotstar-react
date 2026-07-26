import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { saveUserProfile } from '../profileService';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;

      if (isSignUp) {
        try {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
          if (err.code === 'auth/email-already-in-use') {
            setIsSignUp(false);
            userCredential = await signInWithEmailAndPassword(auth, email, password);
          } else {
            throw err;
          }
        }
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      await saveUserProfile({
        uid: user.uid,
        displayName: name.trim() || user.displayName || email.split('@')[0],
        email: user.email || email,
        phoneNumber: phone.trim() || user.phoneNumber || '',
      });

      navigate('/profile');
    } catch (err) {
      const message = err.message || 'Unable to complete the request.';
      setError(message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">DISNEY+ HOTSTAR</div>
        <h1>{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
        <p className="login-subtitle">
          {isSignUp
            ? 'Sign up to keep watching your favorites.'
            : 'Sign in to continue to your profile and watchlist.'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp ? (
            <>
              <label className="login-field">
                <span>Full Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label className="login-field">
                <span>Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                />
              </label>
            </>
          ) : null}

          <label className="login-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              minLength="6"
              required
            />
          </label>

          {error ? <p className="login-error">{error}</p> : null}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          className="login-toggle"
          onClick={() => {
            setIsSignUp((value) => !value);
            setError('');
          }}
        >
          {isSignUp ? 'Already have an account? Sign in' : 'New here? Create account'}
        </button>

        <Link to="/" className="login-back-link">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Login;
