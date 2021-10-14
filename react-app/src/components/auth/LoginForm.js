import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css';
import frame from '../../image_assets/frame.png'


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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="pageContainer">
      <div className="main">
        <img src={frame} alt='rotating phone images' className='frame' />
        <form onSubmit={onLogin} className='loginContainer'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
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
            <div className="loginBtn">
              <button className='btn' type='submit'>Login</button>
            </div>
            <div className="orContainer">
              <span className="orText">OR</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
