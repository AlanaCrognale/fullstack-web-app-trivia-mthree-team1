import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap'
import { NavLink } from "react-router-dom"
import bigbrainstore from '../stores/Store'

class DeleteModal extends React.Component {

    deleteAccount() {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            mode: 'cors',
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        const postUrl = 'http://localhost:8080/api/bigbraintrivia/player/' + bigbrainstore.currentUser

        fetch(postUrl, requestOptions)
    }

    render() {
        let { show, handleClose } = this.props;
        console.log('Show: ' + show)

        return (
            <Modal show={show} onHide={handleClose} className="fade new-user-modal">
                <div className='modal-content text-center' style={{padding: "25px"}}>
                    <h3 style={{padding: "25px"}}>Are You Sure You Want To Delete Your Account?</h3>
                    <h5 style={{padding: "25px"}}>This Change Cannot Be Undone</h5>
                    <Button variant='success'><NavLink to='/' onClick={this.deleteAccount} style={{color: "white", textDecoration: "none"}}>Yes</NavLink></Button><br />
                    <Button variant='danger' onClick={handleClose}>No</Button>
                </div>
          </Modal>
        );
  }
};

export default DeleteModal
