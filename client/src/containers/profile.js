import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Profile extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.profile.display}</h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/Spam_can.png"></img>
      </div>    
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, null)(Profile);