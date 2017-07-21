import React, { Component } from 'react';

class InviteLink extends Component {
  handleGroupInviteButton() {
    const message = 'Share this code with others to join the group! :';  
    alert(message + '\n' + this.props.group.shortID);
  }

  render() {    
    return (
      <div>
        <button onClick={() => this.handleGroupInviteButton()}>+</button>
      </div>
    );
  }
}

export default InviteLink;