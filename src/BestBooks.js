import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  makeRequest = async () => {
    const {getIdTokenClaims} = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = {headers: {"Authorization": `Bearer ${jwt}`}}

    const serverResponse = await axios.get('http://localhost:3001/test-login', config);
    console.log(serverResponse);

  }
  render() {
    console.log(this.props.auth0);
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <button onClick={this.makeRequest}>Make Request</button>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
