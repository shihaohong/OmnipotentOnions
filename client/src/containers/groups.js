import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import LeaveGroup from './leave_group';

import { Segment, Icon, Menu, Input } from 'semantic-ui-react';

class Groups extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      showInvite: false,
    };
    this.shortIdView = this.shortIdView.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroups(this.props.profile);    
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


  renderGroups() {
    return _.map(this.props.groups, group => {
      console.log('GROUP SHORT ID BRO! ', group);
      return (
        <Menu.Item className='groupName' key={group.group_id} value={group.group_id} onClick={(e) => { this.props.handleChannel; }}>   
          {group.groups.name}
          <InviteLink group={group.groups} profile={this.props.profile} showShortId={this.shortIdView}/>
          <LeaveGroup group={group} handleDeleteGroup={this.props.handleDeleteGroup}/>
          {
            this.state.showInvite ? <Input value={group.groups.shortID}/> : null
          }
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <Menu.Item>
        <Menu.Header>
          Groups
          <Icon className='events' inverted color='teal' name='calendar'/>
        </Menu.Header>
          
        <Menu.Menu>
          {this.renderGroups()}
        </Menu.Menu>
        <NewGroup profile={this.props.profile}/>
        <JoinGroup profile={this.props.profile}/>

      </Menu.Item>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);
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