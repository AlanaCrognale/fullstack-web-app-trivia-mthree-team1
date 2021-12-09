import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap'

class NewUserModal extends React.Component {

    render() {
        let { show, handleClose, username } = this.props;
        console.log('Show: ' + show)

        return (
            <Modal show={show} onHide={handleClose} className="fade new-user-modal">
                <div className='modal-content text-center' style={{padding: "25px"}}>
                    <h3 style={{padding: "25px"}}>New User {username} Created!</h3>
                    <h4 style={{padding: "25px"}}>You May Now Log In</h4>
                    <Button variant='success' onClick={handleClose}>Ok</Button>
                </div>
          </Modal>
        );
  }
};

export default NewUserModal
