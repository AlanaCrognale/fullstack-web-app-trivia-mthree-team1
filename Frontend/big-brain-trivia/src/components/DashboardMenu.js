import React from "react"
import { NavLink, Link } from "react-router-dom"

function DashboardMenu (){
    return (
        <div id="dashboard_menu" className="App-menu">
            <ul>
                <li><Link to='/dashboard/home'>
                    Home
                </Link></li>
                <li><Link to='/dashboard/profile'>
                    Profile
                </Link></li>
                <li><Link to='/dashboard/leaderboard'>
                    Leaderboard
                </Link></li>
                <li style={{float: "right", paddingRight: "5px"}}><NavLink to='/'>
                    Log out
                </NavLink></li>
            </ul>
        </div>
    )
}

export default DashboardMenu
