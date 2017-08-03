import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateProfileBio, fetchProfile, updateNickname } from '../actions';
import { Image, Segment, Button, Container } from 'semantic-ui-react';
import axios from 'axios';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditBio: false,
      showEditNickname: false
    };
    this.toggleNickname = this.toggleNickname.bind(this);
    this.toggleBio = this.toggleBio.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.editNickname = this.editNickname.bind(this);
  }

  componentWillMount() {
    this.props.fetchProfile(window.myUser);
  }

  renderField(field) {
    return (
      <div>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  toggleNickname() {
    this.setState({
      showEditNickname: !this.state.showEditNickname
    });
    // console.log(this.state.showEditNickname);
  }

  toggleBio() {
    this.setState({
      showEditBio: !this.state.showEditBio
    });
    // console.log(this.state.showEditBio);
  }


  editProfile(e) {
    console.log('edit profile function', e.editProfile);
    let aboutMe = e.editProfile;
    let profile_id = window.myUser.id;
    if (aboutMe === undefined) {
      aboutMe = '';
    }
    this.props.updateProfileBio(aboutMe, profile_id);
    this.toggleBio();
  }

  editNickname(e) {
    let nickname = e.editNickname;
    let profile_id = window.myUser.id;
    if (nickname === undefined) {
      nickname = ''; 
    }
    this.props.updateNickname(nickname, profile_id);
    this.toggleNickname();
  }
   
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <div id='profile-page-pic'>
          <div id='profile-page-img'>
            <Image shape='circular' src={this.props.profile.profilePic} />
          </div>
          <Button className='profile-page-buttons ui teal' onClick={this.toggleNickname}>edit nickname</Button>
          <Button className='profile-page-buttons ui teal' onClick={this.toggleBio}>edit bio</Button>
        </div>
        <div id='profile-page-segment'>
          <div className='profile-page-data'>
            <p className='profile-data-important'>
              {this.props.profile.display}
            </p> 
            
            {
              this.state.showEditNickname ?
                <form onSubmit={handleSubmit(this.editNickname)}>
                  <Field
                    name='editNickname'
                    component='input'
                  />
                  <div>
                    <Button type='submit' className="ui teal button mini">Change Nickname</Button>
                  </div>
                </form> : <p><b>Nickname:</b> {this.props.profile.nickname}</p>
            }
            
            <p><b>Email:</b> {this.props.profile.email}</p>
            
            {
              this.state.showEditBio ? 
                <form onSubmit={handleSubmit(this.editProfile)}>
                  <Field
                    id='about-me-form'
                    name='editProfile'
                    component='textarea'
                  />
                  <div>
                    <Button type='submit' className="ui teal button mini">Change About Me</Button>
                  </div>
                </form> : 
                <p>
                  <b>About Me: </b> <br />
                  {this.props.profile.aboutMe}
                </p> 
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {groups: state.groups, profile: state.profile};
};

export default reduxForm({
  form: 'ProfileForm'
})(connect(mapStateToProps, {fetchProfile, updateProfileBio, updateNickname })(Profile));
