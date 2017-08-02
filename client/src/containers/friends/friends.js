import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchFriends, fetchPendingRequests, fetchFriendRequests } from '../../actions';
import { bindActionCreators } from 'redux';

import FriendsAdd from './friends_add';
import FriendsList from './friends_list';
import PendingList from './friends_pending';
import { Menu, Header, Image } from 'semantic-ui-react';

export class Friends extends Component {
  constructor(props) {
    super(props);
    this.props.fetchProfile(myUser);
    this.props.fetchFriends(myUser.id); 
    this.props.fetchPendingRequests(myUser.id); 
    this.props.fetchFriendRequests(myUser.id);

    this.state = {
      activeItem: 'Friends'
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name
    });
  }

  renderPage() {
    console.log('id undefined?', this.props.profile.id);
    if (this.state.activeItem === 'Friends') {
      this.props.fetchFriends(this.props.profile.id);
      return <FriendsList />;
    } else if (this.state.activeItem === 'Pending') {
      this.props.fetchPendingRequests(this.props.profile.id);
      this.props.fetchFriendRequests(this.props.profile.id);
      return <PendingList />;
    }  else if (this.state.activeItem === 'Add') {
      return <FriendsAdd />;
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <div>
          <Menu inverted vertical id='sidebar'>
            <Menu.Item>
              <Header as='h4' className='ui grey text'>
                <Image shape='circular' src={window.myUser.profilePic}/>
                {' '} {window.myUser.display}
              </Header>
            </Menu.Item>     
            <Menu.Item 
              name='Friends'
              active={activeItem === 'Friends'}
              onClick={this.handleItemClick}
            />  
            <Menu.Item
              name='Pending'
              active={activeItem === 'Pending'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Add'
              active={activeItem === 'Add'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </div>
        <div id='main'>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { profile: state.profile };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ 
    fetchProfile,
    fetchFriends,
    fetchPendingRequests, 
    fetchFriendRequests
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);