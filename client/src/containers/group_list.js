import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import LeaveGroup from './leave_group';

import { Segment, Icon, Menu, Input } from 'semantic-ui-react';

class GroupList extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      showInvite: false,
    };
    this.shortIdView = this.shortIdView.bind(this);
  }

  // handleItemClick = (e, { name }) => this.setState({activeItem: name});
  handleItemClick(e, {name}) {
    this.setState({activeItem: name});
  }

  shortIdView() {
    const message = 'Share this code with others to join the group! :';  
    // alert(message + '\n' + this.props.group.shortID);
    this.setState({
      showInvite: !this.state.showInvite
    });
  }


  render() {
    return (
      <Menu.Item className='groupName' 
        key={this.props.group.group_id} 
        value={this.props.group.group_id} 
        onClick={(e, d) => { this.props.handleChannel(d) ;}}>   
        {this.props.group.groups.name}
        <InviteLink 
          group={this.props.group.groups} 
          profile={this.props.profile} showShortId={this.shortIdView}/>
        <LeaveGroup 
          group={this.props.group} 
          handleDeleteGroup={this.props.handleDeleteGroup}/>
        {
          this.state.showInvite ? <Input
                                    className='sharelink'
                                    color='teal'
                                    inverted color='teal' 
                                    value={`share this code: ${this.props.group.groups.shortID}`}
                                    transparent={true}/> : null
        }
      </Menu.Item>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups })(GroupList);
//         <button onClick={this.props.handleChannel} value={group.group_id}>  </button>
      // <div>
      //   <h2>Groups</h2>
      //   <Segment.Group>
      //     {this.renderGroups()}
      //     <NewGroup profile={this.props.profile}/>
      //     <JoinGroup profile={this.props.profile}/>
      //     <button onClick={this.props.showEvents}>
      //       <Icon name='calendar' size='big' />          
      //     </button>
      //   </Segment.Group>
      // </div>

      // #009c95