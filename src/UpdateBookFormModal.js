import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';


class UpdateBookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.selectedBook.title,
      description: this.props.selectedBook.description,
      email: this.props.auth0.user.email,
      _id: this.props.selectedBook._id,
      status: this.props.selectedBook.status,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdate(this.state);
    this.props.hideUpdateModal();
  }

  // handleTitleChange = (event) => {
  //   this.setState({ title: event.target.value 
  //   });
  // }

  // handleDescriptionChange = (event) => {
  //   this.setState({ description: event.target.value 
  //   });
  // }

  // handleStatusChange = (event) => {
  //   this.setState({status: event.target.value,
  //   }); 
  // }


  render() {
    return (
      <>
          <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Here you can add a new book if you would like!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Book Description</Form.Label>
                <Form.Control type="text" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}/>
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Book Status</Form.Label>
                <Form.Control type="text" value={this.state.descirtion} onChange={(e) => this.setState({status: e.target.value})}/>
              </Form.Group>
              <Button variant="secondary" type="submit">Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateBookFormModal);
