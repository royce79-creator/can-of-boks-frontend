import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import Bookshelf from './Bookshelf'

class App extends React.Component {

  render() {
    console.log(this.props.auth0);
    const { user, isLoading, isAuthenticated } = this.props.auth0;
    console.log('user', user)
    if (isLoading) {

    }
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <h1>Hello World!!!!</h1>
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
              </Route>
              <Route exact path="/profile">
                {isAuthenticated ? <Profile /> : ''}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                {isAuthenticated ? <Bookshelf /> : ''}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
