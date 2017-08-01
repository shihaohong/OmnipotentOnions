import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';


import { Icon, Button } from 'semantic-ui-react';

class InviteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvite: true
    };
    
  }


  render() {    
    return (
      <Icon 
      inverted
      color='teal'
      name='plus'
      onClick={this.props.showShortId}/>
    );
  }
}

export default InviteLink;

        // {
        //   this.state.showInvite ? 
        //     <Button circular 
        //     color='teal' 
        //     icon='plus'
        //     floated='right'
        //     size='mini' 
        //     onClick={this.handleGroupInviteButton}/>
        //     : 
        //     <div>
              // <label>share this code</label>
              // <Input value={this.props.group.shortID}/><button onClick={() => this.handleGroupInviteButton()}>x</button>
        //     </div>
        // }

        // 

      //         className='buttonGroup'
      // color='teal' 
      // icon='plus'
      // floated='right'
      // size='mini' 
      // onClick={this.handleGroupInviteButton}/>