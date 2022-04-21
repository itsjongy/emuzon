import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getProducts } from '../../store/product';
import { getCart } from '../../store/cart';
import LogoutButton from '../auth/LogoutButton';
import './style/NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  // const [categories, setCategories] = useState("");
  const cart = useSelector(state => Object.values(state.cart));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(getCart(user?.id))
    })()
  }, [dispatch, user])

  const loggedUser = () => {
    if (user) {
      return (
        <div className='navbar-container-logged'>
          <Link className='nav-home-link' to='/' exact='true'>
            <img className='nav-logo' alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
          </Link>
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
          {/* insert categories in here */}
        </div >
      )
    } else {
      return (
        <nav>
          <div className='navbar-container-notlogged'>
            <Link className='nav-home-link' to='/' exact='true'>
              <img className='nav-logo' alt='nav-logo' src='https://cdn.discordapp.com/attachments/402059564910116875/963960642698616902/amazan.png'></img>
            </Link>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p className='navbar-hello'>Hello</p>
                <p className='navbar-account'>Please log in.</p>
              </Link>
            </div>
            <div className='nav-searchbar'>
              {/* put search bar */}
            </div>
            <div>
              <Link className='nav-home-link' to='/login' exact='true'>
                <p className='navbar-hello'>Hello, Sign in</p>
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
          {/* insert categories in here */}
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
