import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../store/product';
import Categories from './Categories';
import { getCart } from '../../store/cart';
import LogoutButton from '../auth/LogoutButton';
import './style/NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState("");
  const cart = useSelector(state => Object.values(state.cart));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(getCart(user?.id))
    })()
  }, [dispatch, user])

  useEffect(() => {
    (async () => {
      const data = await dispatch(getProducts());
      setCategories(Object.values(data).map(each => each.category))
    })();
  }, [dispatch]);

  const links = {
    linkedin: [
      "https://www.linkedin.com/in/itsjongy/",
      "https://cdn.discordapp.com/attachments/402059564910116875/967620105540337726/linkedin.png",
    ],
    github: [
      "https://github.com/itsjongy",
      "https://cdn.discordapp.com/attachments/402059564910116875/967622433500725298/GitHub-Mark-120px-plus.png",
    ],
  };

  const loggedUser = () => {
    if (user) {
      return (
        <nav>
          <div className='navbar-container-logged'>
            <Link className='nav-home-link' to='/' exact='true'>
              <img className='nav-logo' alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
            </Link>
            <div className="navbar-aboutmecontainer">
              <div className="navbar-aboutme">
                <div className='navbar-linkedin'>
                  <a href={links["linkedin"][0]}>
                    <img className='aboutme-image' alt="linkedin" src={links["linkedin"][1]}></img>
                  </a>
                </div>
                <div>
                  <a href={links["github"][0]}>
                    <img className='aboutme-image' alt="github" src={links["github"][1]}></img>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <p className='navbar-deliver-to'>Deliver to {user.first_name}</p>
            </div>
            <div className='navbar-searchbar'>
              {/* put search bar */}
            </div>
            <div>
              <p className='navbar-hello'>Hello, {user.first_name}</p>
              <p className='navbar-account'>Account</p>
            </div>
            <div>
              <p className='navbar-orders'>Orders</p>
            </div>
            <Link className='navbar-cartlink' to="/cart" exact="true">
              <div className='navbar-cart'>
                <div className='navbar-cartnbadge'>
                  <span className="navbar-cart-badge">
                    {user
                      ? Object.keys(cart).reduce(function (previous, key) {
                        return previous + cart[key].quantity;
                      }, 0)
                      : 0}
                  </span>
                </div>
                <div className='navbar-cartntext'>
                  <img className='navbar-cart-logo' alt='cart_logo' src='https://cdn.discordapp.com/attachments/402059564910116875/964049193553518592/cart.png'></img>
                  <p className='navbar-carttext'>Cart</p>
                </div>
              </div>
            </Link>
            <div>
              <LogoutButton />
            </div>
          </div >
          <Categories categories={categories} />
        </nav>
      )
    } else {
      return (
        <nav>
          <div className='navbar-container-notlogged'>
            <Link className='nav-home-link' to='/' exact='true'>
              <img className='nav-logo' alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
            </Link>
            <div className="navbar-aboutmecontainer">
              <div className="navbar-aboutme">
                <div className='navbar-linkedin'>
                  <a href={links["linkedin"][0]}>
                    <img className='aboutme-image' alt="linkedin" src={links["linkedin"][1]}></img>
                  </a>
                </div>
                <div>
                  <a href={links["github"][0]}>
                    <img className='aboutme-image' alt="github" src={links["github"][1]}></img>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p className='navbar-hellologgedout'>Hello</p>
                <p className='navbar-account'>Please log in.</p>
              </Link>
            </div>
            <div className='nav-searchbar'>
              {/* put search bar */}
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p className='navbar-hellologgedout'>Hello, Sign in</p>
                <p className='navbar-account'>Account</p>
              </Link>
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p className='navbar-orders'>Orders</p>
              </Link>
            </div>
            <Link className='navbar-cartlink' to="/login" exact="true">
              <div className='navbar-cart'>
                <div className='navbar-cartnbadge'>
                  <span className="navbar-cart-badge">
                    {user
                      ? Object.keys(cart).reduce(function (previous, key) {
                        return previous + cart[key].quantity;
                      }, 0)
                      : 0}
                  </span>
                </div>
                <div className='navbar-cartntext'>
                  <img className='navbar-cart-logo' alt='cart_logo' src='https://cdn.discordapp.com/attachments/402059564910116875/964049193553518592/cart.png'></img>
                  <p className='navbar-carttext'>Cart</p>
                </div>
              </div>
            </Link>
          </div>
          <Categories categories={categories} />
        </nav>
      )
    }
  }

  return (
    <>
      {loggedUser()}
    </>
  );
}

export default NavBar;
