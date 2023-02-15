import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage'
import ProductPage from './components/ProductPage';
import NewReviewForm from './components/Review/CreateReviewForm';
import EditReviewForm from './components/Review/EditReviewForm';
import Cart from './components/Cart';
import Checkout from './components/Checkout/Checkout';
import Category from './components/Category/Category';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/checkout" exact={true}>
          <Checkout />
        </ProtectedRoute>
        <ProtectedRoute path="/products/:productId/new-review" exact={true}>
          <NewReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path="/products/:productId/:reviewId/edit-review" exact={true}>
          <EditReviewForm />
        </ProtectedRoute>
        <Route path="/products/:productId" exact={true}>
          <ProductPage />
        </Route>
        <Route path="/products/category/:category" exact={true}>
          <Category />
        </Route>
        <Route path="/cart" exact={true}>
          <Cart />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
