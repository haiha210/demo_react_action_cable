import React, { Component } from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';

import { createConsumer } from "@rails/actioncable"

class Player extends Component {
  constructor() {
    super()
    this.cable = createConsumer('ws://localhost:28080/cable')
  }

  componentDidMount() {
    this.createSubscription()
  }

  createSubscription = () => {
    this.subscriptions = this.cable.subscriptions.create(
      { channel: 'PlayerChannel', game_id: 'ea0134b736024ce7a773ec218f9fc4d2' },
      {
        connected: () => {
          console.log("player channel connected");
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
      { message: e.target.message.value }
    )
    e.target.reset()
  }

  render() {
    return (
      <div>
        <ActionCableProvider cable={this.cable} />
        <p>Player</p>
        <form onSubmit={this.handleSubmitMessage}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form>
      </div>
    );
  }
}

export default Player;
