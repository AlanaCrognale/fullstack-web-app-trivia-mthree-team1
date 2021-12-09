import React, { Component } from 'react'
import { Container, Row, Col, Table, DropdownButton, Dropdown} from 'react-bootstrap'


const options = ["Total Games Won", "Animals High Score", "General Knowledge High Score", "Sports High Score", "Video Games High Score"];

class Leaderboard extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        dropdownSelection: '',
        data: []
      }
      this.handleSelect = this.handleSelect.bind(this)
  }

    componentDidMount = () => {
    this.setState({dropdownSelection: options[0]})

        fetch('http://localhost:8080/api/bigbraintrivia/leaderboard/wins')
          .then(response => response.json())
          .then(json => this.setState({data: [json[0].name, json[0].wins, json[1].name, json[1].wins, json[2].name, json[2].wins, json[3].name, json[3].wins, json[4].name, json[4].wins]}))

    }

    async handleSelect (event) {
        this.setState({dropdownSelection: options[event]})

        var getUrl = 'http://localhost:8080/api/bigbraintrivia/leaderboard/highscore'

        switch (this.state.dropdownSelection) {

            case options[0]:
                await fetch('http://localhost:8080/api/bigbraintrivia/leaderboard/wins')
                    .then(response => response.json())
                    .then(json => {
                        this.setState({data: [json[0].name, json[0].wins, json[1].name, json[1].wins, json[2].name, json[2].wins, json[3].name, json[3].wins, json[4].name, json[4].wins]}, () => {
                            this.setState({data: this.state.data})
                })})
                break

            case options[1]:
                await fetch(getUrl)
                    .then(response => response.json())
                    .then(json => {
                        json = json[3]
                        this.setState({data: [json[0].name, json[0].score, json[1].name, json[1].score, json[2].name, json[2].score, json[3].name, json[3].score, json[4].name, json[4].score]}, () => {
                        this.setState({data: this.state.data})
                })})
                break

            case options[2]:
                await fetch(getUrl)
                    .then(response => response.json())
                    .then(json => {
                        json = json[0]
                        this.setState({data: [json[0].name, json[0].score, json[1].name, json[1].score, json[2].name, json[2].score, json[3].name, json[3].score, json[4].name, json[4].score]}, () => {
                        this.setState({data: this.state.data})
                })})
                break

            case options[3]:
                await fetch(getUrl)
                    .then(response => response.json())
                    .then(json => {
                        json = json[2]
                        this.setState({data: [json[0].name, json[0].score, json[1].name, json[1].score, json[2].name, json[2].score, json[3].name, json[3].score, json[4].name, json[4].score]}, () => {
                        this.setState({data: this.state.data})
                })})
                break

            case options[4]:
                await fetch(getUrl)
                    .then(response => response.json())
                    .then(json => {
                        json = json[1]
                        this.setState({data: [json[0].name, json[0].score, json[1].name, json[1].score, json[2].name, json[2].score, json[3].name, json[3].score, json[4].name, json[4].score]}, () => {
                        this.setState({data: this.state.data})
                })})
                break
        }
    }

    render(){
        return (
            <div>
              <Container fluid>
                <div className="card-home card-leaderboard">
                <Row style={{padding: "45px"}}>
                  <div className="col">
                  <h1 style={{paddingBottom: "25px"}}>Big Brain Leaderboards</h1>
                    <DropdownButton id="dropdown-item-button" title="Stats">
                      <Dropdown.Item as="button" eventKey={0} onSelect={this.handleSelect}>Total Games Won</Dropdown.Item>
                      <Dropdown.Item as="button" eventKey={1} onSelect={this.handleSelect}>Animals High Score</Dropdown.Item>
                      <Dropdown.Item as="button" eventKey={2} onSelect={this.handleSelect}>General Knowledge High Score</Dropdown.Item>
                      <Dropdown.Item as="button" eventKey={3} onSelect={this.handleSelect}>Sports High Score</Dropdown.Item>
                      <Dropdown.Item as="button" eventKey={4} onSelect={this.handleSelect}>Video Games High Score</Dropdown.Item>
                    </DropdownButton><br />
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>{this.state.dropdownSelection}</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>{this.state.data[0]}</td>
                            <td>{this.state.data[1]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.data[2]}</td>
                            <td>{this.state.data[3]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.data[4]}</td>
                            <td>{this.state.data[5]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.data[6]}</td>
                            <td>{this.state.data[7]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.data[8]}</td>
                            <td>{this.state.data[9]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Row>
                </div>
              </Container>
            </div>
        )
    }
}

export default Leaderboard


