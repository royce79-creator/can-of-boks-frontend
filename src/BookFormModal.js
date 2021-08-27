import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
      email: this.props.auth0.user.email,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleCreate(this.state);
    this.props.hideModal();

    let title = e.target.title.value;
    let description = e.target.description.value;
    let status = e.target.status.value;
    let email = this.props.auth0.user.email;
    this.props.handleCreate({title, description, status, email});
  }

  render() {
    return (
      <>
        <Modal
          showModal={this.props.showModal}
          hideModal={this.props.hideModal}   
        >
          <Modal.Header closeButton>
            <Modal.Title>Here you can add a new book if you would like!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Enter a book title" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Book Description</Form.Label>
                <Form.Control type="text" placeholder="Enter a description" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Book Status</Form.Label>
                <Form.Control type="text" placeholder="enter a Status" />
              </Form.Group>
              <Button variant="secondary" type="submit">Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default withAuth0(BookFormModal);

//ON CHANGE FOR THE FORM.CRONTOL
// onChange={this.handleTitle} value={this.state.title} 
// onChange={this.handleDescription} value={this.state.description}
// onChange={this.handleStatus} value={this.state.status}

// FOR THE EDIT OF THE MODAL
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.handleUpdate(this.state);
  //   this.props.handleClose();
  // }

  // handleTitle = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     title: e.target.value,
  //   });
  // }

  // handleDescription = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     description: e.target.value,
  //   });
  // }

  // handleStatus = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     status: e.target.value,
  //   });
  // }
  // closeForm = () => {
  //   this.props.closedEditForm();
  // }
