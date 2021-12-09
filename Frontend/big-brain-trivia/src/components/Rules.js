

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomeTab.css'
import logo from '../logo.png'

class Rules extends React.Component {

    render(){
        return(<div className='card-home home-section'>
                    <div className='card-body'>
                        <div className='card-title'>Game Rules</div>

                        <div>Now&#39;s your chance to show off that Big Brain of yours and test your knowledge!</div>
                        <br />

                        <ul>
                            <li>There are 15 multiple-choice questions per game</li>
                            <li>Every 5 questions, the difficulty increases, and so do the points!</li>
                            <li>Every game, you may only answer 3 questions wrong before you lose</li>
                        </ul>

                        <div>Good Luck!</div>

                        <img className="rules-logo" src={logo} alt="Logo" style={{height: "10em", paddingTop: "10px"}}/>

                    </div>
                </div>);
    }
};

export default Rules;
