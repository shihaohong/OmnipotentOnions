import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { leaveGroup } from '../actions';

import { Icon, Button } from 'semantic-ui-react';

class LeaveGroup extends Component { 
  constructor(props) {	
    super(props);
    
    this.onHandleLeaveGroup = this.onHandleLeaveGroup.bind(this);
  }

  onHandleLeaveGroup() {
    this.props.leaveGroup(this.props.group.id, this.props.group.profile_id);
    // this.props.handleDeleteGroup();
    this.props.handleDeleteGroup();
  }

  render() {
    return (
      <Icon
      inverted
        color='teal'
        name='minus'
        onClick={this.onHandleLeaveGroup}/>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups };
};

export default connect(mapStateToProps, { leaveGroup })(LeaveGroup);