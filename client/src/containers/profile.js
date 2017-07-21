import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.profile);
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
  console.log('STATE', state);
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, null)(Profile);