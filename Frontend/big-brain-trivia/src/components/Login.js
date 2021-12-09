import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bigbrainstore from '../stores/Store.js'
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {},
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.validate()){
            let errors = {};

            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.state.input['username'], password: this.state.input['password']})
            };

            const postUrl = 'http://localhost:8080/api/bigbraintrivia/player/login'

            fetch(postUrl, requestOptions)
                .then(response => response.json())
                .then(data => {

                    if (data.message === "User Not Found!") {
                        console.error(data.message);
                        errors["username"] = data.message;
                        this.setState({errors:errors});
                    }
                    else if (data.message === "Invalid Password") {
                        console.error(data.message);
                        errors["password"] = data.message;
                        this.setState({errors:errors});
                    }
                    else {
                        console.log('User Logged In!');


                        // Set Current User in Store
                        bigbrainstore.setCurrentUser(this.state.input['username']);

                        // Reset Variables
                        let input = {};
                        input["username"] = "";
                        input["password"] = "";
                        this.setState({input:input});

                        // Redirect user to dashboard page
                        this.setState({redirect: true })
                    }
                })
        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your username.";
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        const { redirect } = this.state;
        if (redirect) { return <Redirect to='/dashboard'/>; }
        return (
            <div style={{paddingBottom: "50px", paddingTop: "20px"}}>
                <form onSubmit={this.handleSubmit}>

                    <div class="form-group">
                        <input
                            type="text"
                            name="username"
                            value={this.state.input.username}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Enter username"
                            id="username"
                        />

                        <div className="text-danger">{this.state.errors.username}</div>
                    </div>

                    <div class="form-group">
                        <input
                            type="password"
                            name="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Enter password"
                            id="password"
                        />

                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>

                    <input type="submit" value="Login" class="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default Login
