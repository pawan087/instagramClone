import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Image from './components/Images';
import AddImageForm from './components/Images/AddImageForm';
import EditImageForm from './components/Images/EditImageForm';
import IndividualImage from './components/Images/IndividualImage';
import Results from './components/Results';
import EditCommentForm from './components/Comments/EditCommentForm';

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
        <ProtectedRoute path='/' exact={true} >
          <Image />
        </ProtectedRoute>
        <ProtectedRoute path='/images/new' exact={true} >
          <AddImageForm />
        </ProtectedRoute>
        <ProtectedRoute path='/images/:id' exact={true} >
          <IndividualImage />
        </ProtectedRoute>
        <ProtectedRoute path='/images/:id/edit' exact={true} >
          <EditImageForm />
        </ProtectedRoute>
        <ProtectedRoute path='/results/:tag' exact={true}>
          <Results />
        </ProtectedRoute>
        <ProtectedRoute path='/images/:image_id/comments/:comment_id' exact={true}>
          <EditCommentForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
