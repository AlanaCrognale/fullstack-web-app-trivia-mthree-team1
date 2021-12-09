import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap'

import { NavLink } from "react-router-dom";
import '../styles/GamePage.css'

class ExitModal extends React.Component {
    
  render() {
    let { show, handleClose } = this.props;
    return (
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Dialog className="exit-modal">
          <Modal.Header closeButton>
            <Modal.Title>You are about to exit the game.</Modal.Title>
          </Modal.Header>

          <Modal.Body>
                <Row>
                    <Col className='text-center'>
                        <h3>Are you sure?</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <NavLink to='/dashboard' className="modal-yes">Yes</NavLink>
                    </Col>
                    <Col className='text-center'>
                        <Button variant='link' className="modal-no" onClick={handleClose}>No</Button>
                    </Col>
                </Row>
          </Modal.Body>

        </Modal.Dialog>
      </Modal>
    );
  }
};

export default ExitModal
