import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import BestBooks from './BestBooks'
import Login from './Login'

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
            <Header isAuthenticated={isAuthenticated}/>
            <h1>Your Favorite books!</h1>
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                isAuthenticated ? <BestBooks /> : <Login />}
              </Route>
              <Route exact path="/profile">
                {isAuthenticated ? <Profile /> : ''}
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
