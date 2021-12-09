import React, {CSSProperties} from 'react'
import logo from '../logo.png'
import '../App.css'
import '../styles/Header.css'
import bigbrainstore from '../stores/Store.js'

function Header(){
    var space = " "
    return (
    <div className="header">
        <img className="left-header-logo App-logo" src={logo} alt="Logo" />
        <h1 className="wave">Welcome {bigbrainstore.currentUser}</h1>
        <img className="right-header-logo App-logo" src={logo} alt="Logo" />
    </div>
    )
}

export default Header
