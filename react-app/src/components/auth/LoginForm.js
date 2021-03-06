import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css';
import frame from '../../image_assets/frame.png'
import SplashCarousel from './splashCarousel'
import Footer from '../Footer';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  useEffect(() => {
    let loginButton = document.querySelector(".loginBtn");
    console.log(email)
    if (email && password) {
      loginButton.classList.remove("disabled");
      loginButton.removeAttribute("disabled");
    } else {
      loginButton.classList.add("disabled");
      loginButton.setAttribute("disabled", "");
    }
  }, [email, password])


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    setEmail('demo@aa.io');
    setPassword('password');
  }

  const demo2Login = (e) => {
    setEmail('franky@aa.io')
    setPassword('password')
  }




  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="pageContainer">
      <div className="main">
        <div className="carouselContainer">
          <img src={frame} alt='rotating phone images' className='frame' />
          <div className="carouselPlacement">
            <SplashCarousel />
          </div>
        </div>
        <div className="loginRedirectContainer">
          <form onSubmit={onLogin} className='loginContainer'>
            <div className="loginTitle">Kilogram</div>
            <div className="loginFormContainer">
              <div>
                <input
                  className='loginField'
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  className='loginField'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              {/* <div className="loginBtn blueButton button">
                <button className='btn blueButton button' type='submit'>Login</button>
              </div> */}
              <button className='loginBtn blueButton button' type='submit'>Login</button>
              <div className="orContainer">
                <div className="line" />
                <span className="orText">OR</span>
                <div className="line" />
              </div>
              <div className="demoContainer" onClick={demoLogin}>
                <button className='demo' type='submit'>Log in with Demo User</button>
              </div>
              <div className="demo2LoginContainer">
                <button type='submit' className="demo2Login" onClick={demo2Login}>Log in with Demo User 2</button>
              </div>
            </div>
            <div className='errorContainer'>
              {errors.map((error, ind) => (
                <div className='errorText' key={ind}>{error}</div>
              ))}
            </div>
          </form>
          <div className="redirectContainer">
            <div className="redirectText">
              Don't have an account? <a href="/sign-up" className='redirectSignUp'>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
