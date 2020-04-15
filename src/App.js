import React, { Component } from 'react';
import 'bootstrap';
import './css/App.css';
import './css/bootstrap.min.css';
import Nav from './components/Nav';
import Messages from './api/Messages';
import User from './api/User';
import MessagesPage from './messages/Page';
import AuthPage from './auth/Page';
import RegPage from './registration/Page';
import AddNewMessageModal from './components/AddNewMessageModal'
import AboutPage from './about/Page';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Message from './messages/Message';

class App extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.username = '';
        this.state.addedMessage = false;
        this.state.isOpenModal = false;
        this.state.isAuthorized = false;
    }

    // getIsAuthorized() {
    //     return !!Cookies.get('sid');
    // }

    authChangeHandler = () => {
        if (this.state.isAuthorized === true)
            this.setState({ isAuthorized: false });
        if (this.state.isAuthorized === false) 
            this.setState({ isAuthorized: true });
        console.log(this.state.isAuthorized);
    }

    onChangeModalState = () => {
        if (this.state.isOpenModal === true)
            this.setState({ isOpenModal: false });
        if (this.state.isOpenModal === false)
            this.setState({ isOpenModal: true });
    }

    addMessageHandler = (text) => {
        let id;
        Messages.getAll().then(data => {
                id = Math.random() * (1000000 - 100) + 100;
                return Messages.add(text, this.state.username, id)
            }).then(() => {
                if (this.state.addedMessage === true)
                    this.setState({ addedMessage: false });
                if (this.state.addedMessage === false)
                    this.setState({ addedMessage: true });
            });
    }

    changeUsername = (data) => {
        this.setState({ username: data });
        console.log(this.state.username);
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav onChangeModalState={this.onChangeModalState} isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} username={this.state.username}/>
                    <div className="jumbotron poster">
                        <div className="container">
                            <h1 className="display-3">Аэрофлот приветствует вас!</h1>
                            <p>Пожалуйста расскажите всем о своих впечатлениях от полетов с нами.</p>
                        </div>
                    </div>
                    <AddNewMessageModal isOpenModal={this.state.isOpenModal} onChangeModalState={this.onChangeModalState} addMessageHandler={this.addMessageHandler} />
                    <Route
                        exact path="/"
                        render={(props) => <MessagesPage {...props} addedMessage={this.state.addedMessage} username={this.state.username} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/messages/"
                        render={(props) => <MessagesPage {...props} addedMessage={this.state.addedMessage} username={this.state.username} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/auth/"
                        render={(props) => <AuthPage {...props} isAuthorized={this.state.isAuthorized} changeUsername={this.changeUsername} authChangeHandler={this.authChangeHandler} />} />

                    <Route
                        path="/registration/"
                        render={(props) => <RegPage {...props} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/about/"
                        render={(props) => <AboutPage {...props} isAuthorized={this.state.isAuthorized} />} />
                    <div className="footer d-flex col-12">
                        <div className="col-2"></div>
                        <div className="hr col-8"></div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;