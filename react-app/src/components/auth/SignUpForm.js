import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './style/SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <img alt='amazan_logo' src='https://media.discordapp.net/attachments/402059564910116875/963926759575810068/amazanlogo.png?width=1920&height=580'></img>
      <div>
        <p>Create account</p>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label>First name</label>
            <input
              type='text'
              name='first_name'
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div>
            <label>Last name</label>
            <input
              type='text'
              name='last_name'
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='At least 6 characters'
              onChange={updatePassword}
              value={password}
            ></input>
            <p>Passwords must be at least 6 characters.</p>
          </div>
          <div>
            <label>Re-enter password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
      <div className='signup-tologin'>
        <p>Already have an account?</p>
        <a href='/login'>Sign-in</a>
      </div>
    </div>
  );
};

export default SignUpForm;
