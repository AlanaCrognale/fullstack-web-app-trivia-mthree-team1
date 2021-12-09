import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap'
import bigbrainstore from '../stores/Store.js'
import '../styles/HomeTab.css'
import { Link } from 'react-router-dom'
import { view } from '@risingstack/react-easy-state'

class BeginGame extends React.Component {
    constructor() {
        super();
        this.state = {
            showBeginGame: false,
            animalsVariant: "animals",
            generalKnowledgeVariant: "general-knowledge",
            sportsVariant: "sports",
            videoGamesVariant: "video-games"
        };
        this.selectCategory = this.selectCategory.bind(this);
    }

    selectCategory(event) {
        switch(event.target.value){
            case '27':
                this.setState({
                    animalsVariant: "animals-selected",
                    generalKnowledgeVariant: "general-knowledge",
                    sportsVariant: "sports",
                    videoGamesVariant: "video-games"
                })
                break
            case '9':
                this.setState({
                    animalsVariant: "animals",
                    generalKnowledgeVariant: "general-knowledge-selected",
                    sportsVariant: "sports",
                    videoGamesVariant: "video-games"
                })
                break
            case '21':
                this.setState({
                    animalsVariant: "animals",
                    generalKnowledgeVariant: "general-knowledge",
                    sportsVariant: "sports-selected",
                    videoGamesVariant: "video-games"
                })
                break
            case '15':
                this.setState({
                    animalsVariant: "animals",
                    generalKnowledgeVariant: "general-knowledge",
                    sportsVariant: "sports",
                    videoGamesVariant: "video-games-selected"
                })
                break
            default:
        }
        bigbrainstore.setQuestions(event.target.value)
        this.setState({showBeginGame: true})
    }

    render() {
        return (
            <div className="card-home home-section">
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <br />
                            <div className="card-title text-center">Select Your Category</div>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button className="category" value='27' variant={this.state.animalsVariant} size="block" onClick={this.selectCategory} active>Animals</Button>
                            <br /><br />
                        </Col>
                        <Col md={6}>
                            <Button className="category" value='9' variant={this.state.generalKnowledgeVariant} size="block" onClick={this.selectCategory} active>General Knowledge</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button className="category" value='21' variant={this.state.sportsVariant} size="block" onClick={this.selectCategory} active>Sports</Button>
                            <br /><br />
                        </Col>
                        <Col md={6}>
                            <Button className="category" value='15' variant={this.state.videoGamesVariant} size="block" onClick={this.selectCategory} active>Video Games</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                        {
                            this.state.showBeginGame?
                            <Link className="btn begin" to="/game" style={{color: "white", decorationType: "none"}}>Begin Game</Link> :
                            null
                        }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default view(BeginGame)
