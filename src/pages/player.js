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
      { channel: 'PlayerChannel' },
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

  render() {
    return (
      <div>
        <ActionCableProvider cable={this.cable}/>
        <p>Player</p>
      </div>
    );
  }
}

export default Player;
