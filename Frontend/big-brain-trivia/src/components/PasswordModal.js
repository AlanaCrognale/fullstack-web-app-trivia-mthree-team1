import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import bigbrainstore from '../stores/Store'

class PasswordModal extends React.Component {
   constructor() {
        super();
        this.state = {
            input: {},
            errors: {},
            showModal: false,
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
                mode: 'cors',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: bigbrainstore.currentUser, password: this.state.input['current_password']})
            };

            const postUrl = 'http://localhost:8080/api/bigbraintrivia/player/login'

            fetch(postUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Invalid Password') {
                        console.error(data.message)
                        errors["current_password"] = data.message
                        this.setState({errors: errors})
                    }
                    else {
                        // PUT request using fetch inside useEffect React hook
                        const requestOptions = {
                            mode: 'cors',
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: bigbrainstore.currentUser, password: this.state.input['password']})
                        };

                        const postUrl = 'http://localhost:8080/api/bigbraintrivia/player/' + bigbrainstore.currentUser

                        fetch(postUrl, requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data.message);

                                let input = {};
                                input["current_password"] = "";
                                input["password"] = "";
                                input["confirm_password"] = "";
                                this.setState({input:input});

                                // Pop-up notifying a new user has been created.
                                alert('Password Updated!');
                        })
                    }
                })
        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["current_password"]) {
            isValid = false;
            errors["current_password"] = "Please enter your current password.";
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your new password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your new confirm password.";
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
  render() {
    let {show, handleClose} = this.props;
    return (
      <Modal show={show} onHide={handleClose} className="fade">
        <div className='modal-content text-center' style={{padding: "25px"}}>
            <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <input
                            type="password"
                            name="current_password"
                            value={this.state.input.current_password}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Enter current password"
                            id="current_password"
                        />

                        <div className="text-danger">{this.state.errors.current_password}</div>
                    </div>

                    <div class="form-group">
                        <input
                            type="password"
                            name="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Enter new password"
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
                            placeholder="Confirm new password"
                            id="confirm_password"
                        />

                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>

                    <input type="submit" value="Change Password" class="btn btn-primary" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input onClick={handleClose} value="Close" class="btn btn-danger" />
                </form>
        </div>
      </Modal>
    )
  }
}

export default PasswordModal

