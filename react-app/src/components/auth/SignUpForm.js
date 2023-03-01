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
    const data = await dispatch(signUp(firstName, lastName, email, password, repeatPassword));
    if (data) {
      setErrors(data)
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
    <div className='signup-container'>
      <img className='signup-logo' alt='amazan_logo' src='https://cdn.discordapp.com/attachments/913736037220642847/1080314287224008794/amazanlogo.png'></img>
      <div className='signup-form'>
        <p className='signup-signintext'>Create account</p>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-inputcontainer'>
            <label className='signup-text'>First name</label>
            <input
              type='text'
              name='first_name'
              onChange={updateFirstName}
              value={firstName}
              className='signup-inputbox'
            ></input>
          </div>
          <div className='signup-inputcontainer'>
            <label className='signup-text'>Last name</label>
            <input
              type='text'
              name='last_name'
              onChange={updateLastName}
              value={lastName}
              className='signup-inputbox'
            ></input>
          </div>
          <div className='signup-inputcontainer'>
            <label className='signup-text'>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              className='signup-inputbox'
            ></input>
          </div>
          <div className='signup-inputcontainer'>
            <label className='signup-text'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='At least 6 characters'
              onChange={updatePassword}
              value={password}
              className='signup-inputbox'
            ></input>
            <div className='signup-passwordconfirmtext'>
              <p className='italicsi'>i</p>
              <p className='signup-passwordreq'>Passwords must be at least 6 characters.</p>
            </div>
          </div>
          <div className='signup-inputcontainer'>
            <label className='signup-text'>Re-enter password</label>
            <input
              type='password'
              name='confirmpassword'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              className='signup-inputbox'
            ></input>
          </div>
          <button className='signup-button signup-buttonprimary' type='submit'>Sign Up</button>
          <div className='signup-tologin'>
            <p className='signup-tologintext'>Already have an account?</p>
            <a className='signup-tologinlink' href='/login'>Sign-in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
