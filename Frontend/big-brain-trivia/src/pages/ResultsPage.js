import React from 'react';
import {Container, Col, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavLink } from 'react-router-dom'
import { view } from "react-easy-state";

import '../styles/ResultsPage.css'

import gameLogo from '../logo.png'
import easterEgg from '../images/easterEgg.jpeg'
import egg from '../images/egg.png'

import bigbrainstore from "../stores/Store"

class ResultsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            condition: 'lose',
            game: [],
            showEasterEgg: false
        };
    }

    static defaultProps = {
        score: 30,
        questionsCorrect: 15
    }

    componentDidMount = () => {
        //need to get game score, correct, and incorrect somehow.
        console.log('Results Page Mounted');
        var gameId = bigbrainstore.gameId;
        fetch('http://localhost:8080/api/bigbraintrivia/game/' + gameId, {
                mode: 'cors',
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
              }
              })
        .then(response => response.json())
        .then(data => {
            console.log('Game Received:', data);
            this.setState({ game: [data.score, data.correct, data.wrong] });
        })
        .catch((error) => {
          console.log('Game Data Load Error:');
          console.log(error);
        });

        if (this.state.game[2] < 3){
          this.setState({ condition: 'win' });
        }
    }

    choosePage = (winLose) => {
        if (winLose === 'win'){
            return(<div>
                    <Row>
                        <Col className='text-center'>
                         <h1 id='congrats'>CONGRATULATIONS!</h1>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col className='text-center'>
                            <h2>You win!</h2>
                        </Col>
                    </Row>
                    </div>
                    );
        }
        else {
            return(<div>
                    <Row>
                    <Col className='text-center'>
                         <h1 id='nice-try'>Nice try!</h1>
                    </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col className='text-center'>
                            <h2 id='lost'>But you lost</h2>
                        </Col>
                    </Row>
                    </div>
                    );
        }
    }

    easterEgg =(event)=>{
        if (event) event.preventDefault();
        if (this.state.showEasterEgg === false){
            this.setState({showEasterEgg: true});
        }
        else if (this.state.showEasterEgg === true){
            this.setState({showEasterEgg: false});
        }
    }

    render(){
        return(
            <Container fluid style={{padding: "5em"}}>
                <div className='card-home' >
                <br />
                <br />
                <br />
                {this.choosePage(this.state.condition)}
                <br />
                <Row>
                    <Col>
                        { this.state.showEasterEgg ? <div><img src={easterEgg} className="easter-egg" alt="egg" /><h3>Gotcha!</h3></div>: <img src={gameLogo} className="Game-logo" alt="logo" />}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col className='text-center'>
                        Score: {this.state.game[0]}
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className='text-center'>
                        {this.state.game[1]} / 15 Correct

                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <NavLink className="return-home" to='/dashboard'>Home</NavLink>
                        &nbsp;&nbsp;&nbsp;
                        <img src={egg} id="egg" onClick={this.easterEgg} alt="egg"/>
                    </Col>
                </Row>
                <Row>
                </Row>
                <br/>
                <br/>
                <br/>
            </div>
            </Container>);
    }
};

export default view(ResultsPage);


