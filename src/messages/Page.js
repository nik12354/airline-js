import React, { Component } from 'react';
import MessageList from './MessageList';
import Messages from '../api/Messages';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MessagesPage extends Component {
    // state = {};

    // constructor(props) {
    //     super(props);

    //     this.state.messages = [];
    // }



    // componentDidMount() {
    //     if (this.props.isAuthorized) {
    //         this.reloadMessages();
    //     }
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props.addedMessage && !prevProps.addedMessage) {
    //         this.reloadMessages();
    //     }
    // }

    render() {
        let pageContent;

        if (this.props.isAuthorized) {
            pageContent = (
                <div>
                    <MessageList username={this.props.username} isAuthorized={this.props.isAuthorized} />
                </div>
            );
        } else {
            pageContent = (
                <div className="container">
                    <div className="row">
                        <div className="col col-12">
                            <h3>You need to <Link to="/auth/">authorize</Link> to access this page.</h3>
                        </div>
                    </div>  
                </div>
            )
        }

        return pageContent;
    }
}

export default MessagesPage;