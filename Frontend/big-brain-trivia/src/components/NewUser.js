import React from 'react';
import NewUserModal from '../components/NewUserModal';
import 'bootstrap/dist/css/bootstrap.min.css';

class NewUser extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {},
            showModal: false,
            username: ''
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
        let errors = {};

        event.preventDefault();

        if(this.validate()){

            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.state.input['username'], password: this.state.input['password']})
            };

            const postUrl = 'http://localhost:8080/api/bigbraintrivia/player'

            fetch(postUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'User already exists!') {
                        console.error(data.message)
                        errors["username"] = data.message
                        this.setState({errors: errors})
                    }
                    else {
                        console.log('Success:', data);
                        console.log('New User Form is submitted');

                        this.setState({username: this.state.input["username"]})
                        console.log(this.state.username)

                        let input = {};
                        input["username"] = "";
                        input["password"] = "";
                        input["confirm_password"] = "";
                        this.setState({input:input});

                        // Pop-up notifying a new user has been created.
                        //alert('New user created! You can now try logging in.');
                        this.handleModalOpen()
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

        if (typeof input["username"] !== "undefined") {
            const re = /^\S*$/;
            if(input["username"].length < 4 || !re.test(input["username"])) {
                isValid = false;
                errors["username"] = "Username cannot be less than 4 characters long.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined") {
            if(input["password"].length < 5){
                isValid = false;
                errors["password"] = "Password cannot be less than 5 characters long.";
            }
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] != input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleModalOpen = (event) => {
        console.log("Opening User Modal");
        if (event) event.preventDefault();
        this.setState({ showModal : true});
    }

    handleModalClose = (event) => {
        console.log("Closing User Modal");
        this.setState({ showModal : false});
    }

    render() {
        return (
            <div style={{paddingBottom: "50px"}}>
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

                    <div class="form-group">
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.input.confirm_password}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Confirm password"
                            id="confirm_password"
                        />

                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>

                    <input type="submit" value="Create New User" class="btn btn-primary" />
                </form>
                <NewUserModal show={this.state.showModal} handleClose={this.handleModalClose} username={this.state.username}/>
            </div>
        );
    }
}

export default NewUser
