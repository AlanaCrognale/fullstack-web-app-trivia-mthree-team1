import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import Login from '../components/Login'
import NewUser from '../components/NewUser'
import Rules from '../components/Rules'
import 'bootstrap/dist/css/bootstrap.min.css';

function WelcomePage() {

    return (
        <div id="dashboard_page" className="App-page">
            <Header />
            <div style={{borderBottom: "10px solid black"}}></div>
            <div className="container fluid" style={{paddingTop: "10px"}}>
                <div className="row" style={{textAlign: "center"}}>
                    <div className="col">
                        <Rules />
                    </div>
                    <div className="col">
                        <div className="card-home home-section">
                            <div className="card-body">
                                <div className="card-title">Sign In!</div>
                                <Login />
                                <NewUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage
