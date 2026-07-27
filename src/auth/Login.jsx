import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
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

        <button
          type="button"
          className="login-google-btn"
          disabled={loading}
          onClick={async () => {
            setError('');
            setLoading(true);
            try {
              const provider = new GoogleAuthProvider();
              const result = await signInWithPopup(auth, provider);
              const user = result.user;
              await saveUserProfile({
                uid: user.uid,
                displayName: user.displayName || email.split('@')[0],
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
              });
              navigate('/profile');
            } catch (err) {
              const message = err.message || 'Google sign-in failed.';
              setError(message.replace('Firebase:', '').trim());
            } finally {
              setLoading(false);
            }
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

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
