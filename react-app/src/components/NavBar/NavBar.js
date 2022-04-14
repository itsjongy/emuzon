import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getProducts } from '../../store/product';
import { getCart } from '../../store/cart';
import LogoutButton from '../auth/LogoutButton';
import './style/NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();
  const cart = useSelector(state => Object.values(state.cart));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(getCart(user?.id))
    })()
  }, [dispatch, user])

  return (
    <nav>
      <div className='nav-logo'>
        <Link className='nav-home-link' to='/' exact='true'>
          <img alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
        </Link>
        
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
