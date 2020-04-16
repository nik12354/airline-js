import React, { Component } from 'react';
import Message from './Message';
import Messages from '../api/Messages';


class MessageList extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.messages = [{id: -1, username: 'test', description: 'test'}];
    }   

    reloadMessages = () => {
        Messages.getAll().then((data) => {
            this.setState({ messages: data })
        });
    }

    deleteAllMessagesHandler = () => {
        Messages.deleteAll().then(() => {
            this.reloadMessages();
        })
    }

    deleteMessageHandler = (id) => {
        Messages.delete(id).then(() => {
            this.reloadMessages();
        })
    }

    editMessageHandler = (id, text) => {
        console.log(id)
        Messages.edit(id, text).then(() => {
            this.reloadMessages();
        })
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.reloadMessages();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.addedMessage && !prevProps.addedMessage) {
            this.reloadMessages();
        }
    }

    render() {
        return (
            <div className="container" id="message-list">
                {this.state.messages.map((message) => {
                    return (<Message key={message.id} info={message} username={this.props.username} deleteMessageHandler={this.deleteMessageHandler} editMessageHandler={this.editMessageHandler}/>)
                })}
            </div>
        );
    }
}

export default MessageList;