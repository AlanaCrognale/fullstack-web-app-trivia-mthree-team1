import React, { Component } from 'react'
import { d3, BarChart } from 'react-d3-components'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ProfileModal from '../components/ProfileModal.js'
import bigbrainstore from '../stores/Store.js'
import { view } from 'react-easy-state'


class Profile extends React.Component {
  constructor(props) {

      super(props);

    var playerName = bigbrainstore.currentUser

      this.state = {
        showModal: false,
        errors: {},
        username: bigbrainstore.currentUser,
        password: 'tempPassword',
        modalData: {
          curPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        },
        animalStats: [],
        gkStats: [],
        sportsStats: [],
        vgStats: [],
        gamesWon: '',
        gamesPlayed: '',
        data: [],
        sort: null
      }

      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleModalOpen = this.handleModalOpen.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
      this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
  }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/bigbraintrivia/stats/' + bigbrainstore.currentUser, {
                mode: 'cors',
            })
            .then((response) => response.json())
            .then((json) => this.setState({ animalStats:  [json[3].wins, json[3].highScore, json[3].totalGames, json[3].correctAnswerPercent], gkStats:  [json[0].wins, json[0].highScore, json[0].totalGames, json[0].correctAnswerPercent], sportsStats:  [json[2].wins, json[2].highScore, json[2].totalGames, json[2]], vgStats:  [json[1].wins, json[1].highScore, json[1].totalGames, json[1].correctAnswerPercent]}))

        console.log(this.state)


        this.setState({ gamesWon: this.state.animalStats[0] + this.state.gkStats[0]+ this.state.sportsStats[0] + this.state.vgStats.[0]})
        this.setState({ gamesPlayed: this.state.animalStats[2] + this.state.gkStats[2] + this.state.sportsStats[2] + this.state.vgStats[2]})

        this.setState({ data: [

            {
                label: 'Correct Answers %',
                values: [{x: 'Animals', y: 100*this.state.animalStats[3]}, {x: 'General Knowledge', y: 100*this.state.gkStats[3]}, {x: 'Sports', y: 100*this.state.sportsStats[3]}, {x: 'Video Games', y: 100*this.state.vgStats[3]}]
            },
            {
                label: 'Incorrect Answers %',
                values: [{x: 'Animals', y: 100-(100*this.state.animalStats[3])}, {x: 'General Knowledge', y: 100-(100*this.state.gkStats[3])}, {x: 'Sports', y: 100-(100*this.state.sportsStats[3])}, {x: 'Video Games', y: 100-(100*this.state.vgStats[3])}]
            }

        ] })
    }

  handleModalClose(event){
    console.log("Closing Modal")
    this.setState({ showModal : false})
}

  handleModalOpen(event){
      console.log("Opening Modal")
      if (event) event.preventDefault();
      console.log(`Editing profile`)
      this.setState({ showModal : true})
  }

  handlePasswordChange(event){

      let inputName = event.target.name;
      let inputValue = event.target.value;
      let passwordInfo = this.state.modalData;

      if(passwordInfo.hasOwnProperty(inputName)){
          passwordInfo[inputName] = inputValue;
          this.setState({ modalData : passwordInfo })
      }

  }

  handlePasswordSubmit(event){
      if (event) event.preventDefault();

      //check current password is valid by making get request to Login
      var requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username: this.state.username, password: this.state.modalData.curPassword})
      }
      var getUrl = 'http://localhost:8080/api/bigBrainGame/player/' + this.state.username

      fetch(getUrl, requestOptions)
          .then(response => response.json())
          .catch((error) => this.setState({ errors: error }))

      //if current password is not valid, display error and dont continue
      if (this.state.errors){
        alert(this.state.errors)
      }

      //if current password is valid, continue
      else{
          //check if two new entered passwords are the same - if they are not, display error and dont continue
          if (this.state.modalData.newPassword != this.state.modalData.confirmNewPassword){
            alert("New passwords entered are not the same.")
          }
          else{
            //if two new entered passwords are the same, set new password by making put request to player and display errors returned from service
            requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: this.state.username, password: this.state.modalData.newPassword})
            }
            var putUrl = 'http://localhost:8080/api/bigBrainGame/player/' + this.state.username

            fetch(putUrl, requestOptions)
                .then(response => response.json())
                .catch((error) => this.setState({ errors: error }))

            if (this.state.errors){
                  alert(this.state.errors)
              }
              else{
                alert("Password successfully changed!")
              }
          }
      }
  }

    render(){
        return (
            <div>
              <Container fluid>
                <Row>
                  <Col md={6}>
                    <h2>{'Correct Answers per Category'}</h2>
                    <BarChart
                        data={this.state.data}
                        width={600}
                        height={500}
                        margin={{top: 25, bottom: 50, left: 100, right: 100}}
                        yAxis={{label: "%"}}
                        colorScale={{d3.scale.category10().range(['#33a532', '#cc0605'])}}
                        sort={this.state.sort}
                    />
                    <style>{`
                    g.x.axis text {
                        font-size: 14px;
                        transform-origin: 15px 15px;
                        transform: rotate(-25deg);
                    }
                    `}</style>
                    </Col>
                    <Col>
                      <h2>{this.state.username}</h2>
                      <Button onClick={this.handleModalOpen}>Change Password</Button><br/><br/><br/>

                    {this.state.gamesWon} Victories / {this.state.gamesPlayed} Games Played <br/><br/><br/>
                    High Scores <br/><br/>
                    Animals: {this.state.animalStats[2]} <br/>
                    General Knowledge: {this.state.gkStats[2]}<br/>
                    Sports: {this.state.sportsStats[2]}<br/>
                    Video Games: {this.state.vgStats[2]}:

                    </Col>
                  </Row>
                    <ProfileModal
                      show={this.state.showModal}
                      handleClose={this.handleModalClose}
                      handleSubmit={this.handlePasswordSubmit}
                      handleChange={this.handlePasswordChange}
                      modalData={this.state.modalData}/>
                </Container>
            </div>
        )
    }
}

export default view(Profile)

