import React, { Component } from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';

import { createConsumer } from "@rails/actioncable"

class User extends Component {
  constructor() {
    super()
    this.cable = createConsumer('ws://localhost:28080/cable')
  }

  componentDidMount() {
    this.createSubscription()
  }

  createSubscription = () => {
    this.subscriptions = this.cable.subscriptions.create(
      { channel: 'UserChannel', game_room_id: '1', 'access-token': 'ef42afb-b084-4eb3-b923-c5e8162cfb1a' },
      {
        connected: () => {
          console.log("user channel connected");
        },
        received: message => this.handleReceivedMessages(message),
      }
    )
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) =>
      <li key={i}>{message.content}</li>)
  }

  handleReceivedMessages = message => {
    console.log(message)
  }

  handleSubmitMessage = e => {
    e.preventDefault();
    this.subscriptions.send(
      {
        body: e.target.message.value,
        type: 'test',
      }
    )
    e.target.reset()
  }

  render() {
    return (
      <div>
        <ActionCableProvider cable={this.cable}/>
        <p>Player</p>
        <form onSubmit={this.handleSubmitMessage}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form>
      </div>
    );
  }
}

export default User;
