import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
// import { getProducts } from '../../store/product';
import { getCart } from '../../store/cart';
import LogoutButton from '../auth/LogoutButton';
import './style/NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  // const [categories, setCategories] = useState();
  // const cart = useSelector(state => Object.values(state.cart));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(getCart(user?.id))
    })()
  }, [dispatch, user])

  const loggedUser = () => {
    if (user) {
      return (
        <nav>
          <div className='navbar'>
            <Link className='nav-home-link' to='/' exact='true'>
              <img alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
            </Link>
            <div>
              <p>Deliver to {user.first_name}</p>
            </div>
            <div className='nav-searchbar'>
              {/* put search bar */}
            </div>
            <div>
              <p>Hello, {user.first_name}</p>
              <p>Account</p>
            </div>
            <div>
              <p>Orders</p>
            </div>
            <div>
              {/* put image of cart in here */}
              <p>Cart</p>
            </div>
            <div>
              <LogoutButton />
            </div>
          </div >
          {/* insert categories in here */}
        </nav >
      )
    } else {
      return (
        <nav>
          <div className='navbar'>
            <Link className='nav-home-link' to='/' exact='true'>
              <img alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
            </Link>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p>Hello</p>
                <p>Please log in.</p>
              </Link>
            </div>
            <div className='nav-searchbar'>
              {/* put search bar */}
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p>Hello, Sign in</p>
                <p>Account</p>
              </Link>
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p>Orders</p>
              </Link>
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                {/* put image of cart in here */}
                <p>Cart</p>
              </Link>
            </div>
          </div>
          {/* insert categories in here */}
        </nav>
      )
    }
  }

  return (
    <div>
      {loggedUser()}
    </div>
  );
}

export default NavBar;
