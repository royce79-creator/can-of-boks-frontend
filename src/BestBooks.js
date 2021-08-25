import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    };
  }



  // makeRequest = async () => {
  //   const { getIdTokenClaims } = this.props.auth0;
  //   let tokenClaims = await getIdTokenClaims();
  //   const jwt = tokenClaims.__raw;
  //   console.log(jwt);
  //   const config = { headers: { "Authorization": `Bearer ${jwt}` } }

  //   const serverResponse = await axios.get('http://localhost:3001/test-login', config);
  //   console.log(serverResponse);
  // }
  componentDidMount = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = { headers: { "Authorization": `Bearer ${jwt}` } }

    const bookResponse = await axios.get('http://localhost:3001/books', config);
    console.log('here is my book data', bookResponse.data);
    this.setState({
      books: bookResponse.data,
    });
  }
  handleDeleteBook = async (bookID) => {
    console.log(bookID);
  }

  render() {
    console.log(this.props.auth0);
    console.log('books here', this.state.books);
    return (
      <Jumbotron>
        {this.state.books.length > 0 ? <Carousel> {this.state.books.map(book => (
          <Carousel.Item key={book._id}>
            {/* <Carousel.Caption> */}
            <Card style={{width: "30rem", height: "30rem"}}>
              <Card.Title>
                <h3>{book.title}</h3>
              </Card.Title>
              <Card.Text>
                <p>{book.description}</p>
                <p>{book.email}</p>
                <p>{book.status}</p>
              </Card.Text>
            </Card>
            {/* </Carousel.Caption> */}
            {/* <button onClick={() => this.handleDeleteBook(book._id)}>delete</button> */}
          </Carousel.Item>
        ))}
        </Carousel> : ''}
        {/* </> */}
      </Jumbotron>
    )
  }
}
export default withAuth0(MyFavoriteBooks);

// {/* <button onClick={this.makeRequest}>Make Request</button> */
