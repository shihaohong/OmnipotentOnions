import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvite: true
    };
  }

  handleGroupInviteButton() {
    const message = 'Share this code with others to join the group! :';  
    // alert(message + '\n' + this.props.group.shortID);
    this.setState({
      showInvite: !this.state.showInvite
    });
  }

  render() {    
    return (
      <div>
        {
          this.state.showInvite ? <button onClick={() => this.handleGroupInviteButton()}>+</button> 
            : 
            <div>
              <label>share this code</label>
              <Input value={this.props.group.shortID}/><button onClick={() => this.handleGroupInviteButton()}>x</button>
            </div>
        }
      </div>
    );
  }
}

export default InviteLink;