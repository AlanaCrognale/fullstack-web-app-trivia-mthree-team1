import React, { Component } from 'react'
import { d3, BarChart } from 'react-d3-components'
import { Container, Row, Col, Button } from 'react-bootstrap'
import PasswordModal from '../components/PasswordModal.js'
import DeleteModal from '../components/DeleteModal.js'
import bigbrainstore from '../stores/Store.js'
import { view } from 'react-easy-state'

class Profile extends React.Component {
  constructor(props) {

      super(props);

    var playerName = bigbrainstore.currentUser

      this.state = {
        showPasswordModal: false,
        showDeleteModal: false,
        errors: {},
        animalStats: [],
        gkStats: [],
        sportsStats: [],
        vgStats: [],
        gamesWon: '',
        gamesPlayed: '',
        sort:  null,
        colorScale: d3.scale.category10().range(['#33a532', '#cc0605'])
      }

  }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/bigbraintrivia/stats/' + bigbrainstore.currentUser, {
                mode: 'cors',
            })
            .then((response) => response.json())
            .then((json) => this.setState({ animalStats:  [json[3].wins, json[3].highScore, json[3].totalGames, json[3].correctAnswerPercent], gkStats:  [json[0].wins, json[0].highScore, json[0].totalGames, json[0].correctAnswerPercent], sportsStats:  [json[2].wins, json[2].highScore, json[2].totalGames, json[2].correctAnswerPercent], vgStats:  [json[1].wins, json[1].highScore, json[1].totalGames, json[1].correctAnswerPercent]}))

        console.log(this.state)

        this.setState({ gamesWon: this.state.animalStats[0] + this.state.gkStats[0]+ this.state.sportsStats[0] + this.state.vgStats.[0]})
        this.setState({ gamesPlayed: this.state.animalStats[2] + this.state.gkStats[2] + this.state.sportsStats[2] + this.state.vgStats[2]})

    }


    handlePasswordModalOpen = (event) => {
        console.log("Opening Password Modal")
        if (event) event.preventDefault();
        this.setState({ showPasswordModal : true })
    }

    handlePasswordModalClose = (event) => {
        console.log("Closing Password Modal")
        this.setState({ showPasswordModal : false })
    }

    handleDeleteModalOpen = (event) => {
        console.log("Opening Delete Modal")
        if (event) event.preventDefault();
        this.setState({ showDeleteModal : true })
    }

    handleDeleteModalClose = (event) => {
        console.log("Closing Delete Modal")
        this.setState({ showDeleteModal : false })
    }

    render(){
        return (
            <div>
                <Container fluid style={{width: "85%"}}>
                    <div className="card-home card-profile home-section">
                        <Row>
                            <Col style={{padding: "80px"}}>
                                <h2>{'Correct Answers by Category'}</h2>
                                <BarChart
                                    data={[
                                        {
                                            label: 'Correct Answers %',
                                            values: [{x: 'Animals', y: 100*this.state.animalStats[3]}, {x: 'General Knowledge', y: 100*this.state.gkStats[3]}, {x: 'Sports', y: 100*this.state.sportsStats[3]}, {x: 'Video Games', y: 100*this.state.vgStats[3]}]
                                        },
                                        {
                                            label: 'Incorrect Answers %',
                                            values: [{x: 'Animals', y: 100-(100*this.state.animalStats[3])}, {x: 'General Knowledge', y: 100-(100*this.state.gkStats[3])}, {x: 'Sports', y: 100-(100*this.state.sportsStats[3])}, {x: 'Video Games', y: 100-(100*this.state.vgStats[3])}]
                                        }
                                    ]}
                                    width={600}
                                    height={500}
                                    margin={{top: 25, bottom: 50, left: 100, right: 100}}
                                    yAxis={{label: "%"}}
                                    colorScale={this.state.colorScale}
                                    sort={this.state.sort}
                                />
                                <style>{`
                                g.x.axis text {
                                    font-size: 15px;
                                    transform-origin: 15px 15px;
                                    transform: rotate(-20deg);
                                }
                                g text {
                                    fill: white;
                                }
                                `}</style>
                            </Col>
                            <Col>
                                <h2>{bigbrainstore.currentUser}</h2>

                                {this.state.gamesWon} Victories / {this.state.gamesPlayed} Games Played <br/><br/><br/>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Category</th>
                                            <th scope="col">HighScore</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Animals</td>
                                            <td>{this.state.animalStats[1]}</td>
                                        </tr>
                                        <tr>
                                            <td>General Knowledge</td>
                                            <td>{this.state.gkStats[1]}</td>
                                        </tr>
                                        <tr>
                                            <td>Sports</td>
                                            <td>{this.state.sportsStats[1]}</td>
                                        </tr>
                                        <tr>
                                            <td>Video Games</td>
                                            <td>{this.state.vgStats[1]}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <br /><br />

                                <Button className="profile-button" onClick={this.handlePasswordModalOpen}>Change Password</Button><br /><br />
                                <Button className="profile-button" onClick={this.handleDeleteModalOpen}>Delete Account</Button>

                            </Col>
                    </Row>
                </div>
                    <PasswordModal
                      show={this.state.showPasswordModal}
                      handleClose={this.handlePasswordModalClose}/>
                    <DeleteModal
                      show={this.state.showDeleteModal}
                      handleClose={this.handleDeleteModalClose}/>
                </Container>
            </div>
        )
    }
}

export default view(Profile)

