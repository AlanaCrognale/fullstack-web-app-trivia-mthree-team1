import React, {CSSProperties} from 'react'
import logo from '../logo.png'
import '../App.css'
import '../styles/Header.css'

function Header(){
    var space = " "
    return (
    <div className="header">
        <img className="left-header-logo App-logo" src={logo} alt="Logo" />
        <h1 className="wave">
            <span style={{'--i':1}}>W</span>
            <span style={{'--i':2}}>e</span>
            <span style={{'--i':3}}>l</span>
            <span style={{'--i':4}}>c</span>
            <span style={{'--i':5}}>o</span>
            <span style={{'--i':6}}>m</span>
            <span style={{'--i':7}}>e</span>
            <span style={{'--i':8, opacity:0}}>a</span>
            <span style={{'--i':9}}>t</span>
            <span style={{'--i':10}}>o </span>
            <span style={{'--i':11, opacity:0}}>a</span>
            <span style={{'--i':12, color: 'red'}}>B</span>
            <span style={{'--i':13, color: 'yellow'}}>i</span>
            <span style={{'--i':14,color: 'green'}}>g </span>
            <span style={{'--i':15, opacity:0}}>a</span>
            <span style={{'--i':16,color: 'blue'}}>B</span>
            <span style={{'--i':17, color: 'red'}}>r</span>
            <span style={{'--i':18, color: 'yellow'}}>a</span>
            <span style={{'--i':19, color: 'green'}}>i</span>
            <span style={{'--i':20, color: 'blue'}}>n </span>
            <span style={{'--i':21, opacity:0}}>a</span>
            <span style={{'--i':22}}>G</span>
            <span style={{'--i':23}}>a</span>
            <span style={{'--i':24}}>m</span>
            <span style={{'--i':25}}>e</span>
            <span style={{'--i':26}}>!</span>
        </h1>
        <img className="right-header-logo App-logo" src={logo} alt="Logo" />
    </div>
    )
}

export default Header