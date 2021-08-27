import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import UpdateBookFormModal from './UpdateBookFormModal';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      showUpdateModal: false,
      selectedBook: null,
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
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` }, params: { email: this.props.auth0.user.email }
    }

    const bookResponse = await axios.get('http://localhost:3001/books', config);
    console.log('here is my book data', bookResponse.data);
    this.setState({
      books: bookResponse.data,
    });
  }


  //For the form to show later on! DO NOT DELETE!
  // showForm = () => {
  //   this.state({
  //     stateForm: true,
  //   });
  // }

  // showEditForm = (book) => {
  //   this.setState({
  //     stateEditForm: true,
  //     chosenBook: book,
  //   })
  // }

  // closeEditForm = () => {
  //   this.setState({
  //     stateEditForm: false,
  //   })
  // }
  // closeForm = () => {
  //   this.setState({
  //     stateForm: false,
  //   });
  // } 

  handleCreate = async (bookInfo) => {
    console.log('here is the book info bro!', bookInfo);
    try {
      let response = await axios.post('http://localhost:3001/books', bookInfo);
      let newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      })
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdate = async (book) => {
    try {
      await axios.put(`http://localhost:3001/books/${book._id}`, book);

      let updatingBooks = this.state.books.map(bookState => {
        if (bookState._id === book._id) {
          return book;
        } else {
          return bookState;
        }
      });

      this.setState({
        books: updatingBooks,
      })
    }
    catch (err) {
      console.log(book);
    }
  }

  
  handleDeleteBook = async (bookId) => {
    try {
      const { getIdTokenClaims } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      const jwt = tokenClaims.__raw;
      console.log(jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }, params: { email: this.props.auth0.user.email }
      }
      console.log('This is the Id bruh!', bookId);
      await axios.delete(`http://localhost:3001/books/${bookId}`);
      
      let updatingBooks = this.state.books.filter(book => book._id !== bookId);
      this.setState({
        books: updatingBooks
      });
    } catch (error) {
      console.log(error);
    }
  }

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  }

  openModal = () => {
    this.setState({
      showModal: true,
    });
  }
  hideUpdateModal = () => {
    this.setState({
      showUpdateModal: false,
    });
  }

  openUpdateModal = (bookInfo) => {
    this.setState({
      showUpdateModal: true,
      selectedBook: bookInfo,
    });
  }
  
  render() {
    console.log(this.props.auth0);
    console.log('books here', this.state.books);
    return (
      <>
        <Jumbotron>
          {this.state.books.length > 0 ? <Carousel> {this.state.books.map(book => (
            <Carousel.Item key={book._id}>
              {/* <Carousel.Caption> */}
              <Card style={{ width: "30rem", height: "30rem" }}>
                <Card.Title>
                  <h3>{book.title}</h3>
                </Card.Title>
                <Card.Text>
                  <p>{book.description}</p>
                  <p>{book.email}</p>
                  <p>{book.status}</p>
                </Card.Text>
                <Button variant="danger" onClick={() => { this.handleDeleteBook(book._id) }}>Delete Book</Button>
                <Button variant="primary" onClick={() => { this.openUpdateModal(book._id) }}>Update book</Button>
              </Card>
              {/* </Carousel.Caption> */}
              {/* <button onClick={() => this.handleDeleteBook(book._id)}>delete</button> */}
            </Carousel.Item>
          ))}
          </Carousel> : ''}
          <Button variant="success" onClick={this.openModal}>Add Book</Button>
          <BookFormModal
            showModal={this.state.showModal}
            hideModal={this.hideModal}
            handleCreate={this.handleCreate}
          />
          {
            this.state.showUpdateModal ?
              <UpdateBookFormModal
                showUpdateModal={this.state.showUpdateModal}
                hideUpdateModal={this.hideUpdateModal}
                handleUpdate={this.handleUpdate}
                selectedBook={this.state.selectedBook}
              />
              : ''
          }
          <button></button>
          {/* </> */}
        </Jumbotron>
      </>
    )
  }
}
export default withAuth0(MyFavoriteBooks);

// {/* <button onClick={this.makeRequest}>Make Request</button> */
