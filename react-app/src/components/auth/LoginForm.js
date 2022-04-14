import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './style/LoginForm.css'

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

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"));
  }

  return (
    <div>
      <img alt='amazan_logo' src='https://media.discordapp.net/attachments/402059564910116875/963926759575810068/amazanlogo.png?width=1920&height=580'></img>
      <div>
        <p>Sign-in</p>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit'>Sign-In</button>
          </div>
        </form>
      </div>
      <div className='login-tosignup'>
        <p>New to Amazon?</p>
        <a href='/sign-up'>Create your Amazon account</a>
      </div>
      <div className='login-tosignup'>
        <p className="demo-login-text">Want to try the site?</p>
        <p className="demo-login-text" onClick={demoLogin}>Demo Login</p>
      </div>
    </div>
  );
};

export default LoginForm;
