import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import BeginGame from './BeginGame'
import Rules from './Rules'
import '../styles/HomeTab.css'

function Home() {
    return (
        <Row>
            <Col md={6}>
                <BeginGame/>
            </Col>
            <Col md={6}>
                <Rules/>
            </Col>
        </Row>
    );
}

export default Home