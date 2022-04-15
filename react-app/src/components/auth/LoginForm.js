import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
    <div className='login-page'>
      <div className='login-container'>
        <Link to='/' exact='true'>
          <img className='login-logo' alt='amazan_logo' src='https://media.discordapp.net/attachments/402059564910116875/963926759575810068/amazanlogo.png?width=1920&height=580'></img>
        </Link>
        <div className='login-form'>
          <p className='login-signintext'>Sign-in</p>
          <form onSubmit={onLogin}>
            <div className='login-validators'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='login-inputcontainer'>
              <label className='login-text' htmlFor='email'>Email</label>
              <input
                className='login-inputbox'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login-inputcontainer'>
              <label className='login-text' htmlFor='password'>Password</label>
              <input
                className='login-inputbox'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button className='login-button login-buttonprimary' type='submit'>Sign-In</button>
            </div>
          </form>
        </div>
        <div className='login-tosignup'>
          <div className='separator'>
            New to Amazon?
          </div>
          <a className='login-createlink' href='/sign-up'>Create your Amazon account</a>
          <div className='separator2'>
            <p>Want to try the site?</p>
          </div>
          <p className="demo-login-text" style={{ cursor: "pointer" }} onClick={demoLogin}>Demo Login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
