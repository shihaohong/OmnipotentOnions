import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateProfileBio, fetchProfile, updateNickname } from '../actions';
import axios from 'axios';

export class Profile extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    // this.props.fetchProfile(window.myUser);
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
    // const { meta: { touched, error } } = field; 
    // const textareaType = <textarea {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
    // const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
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
    console.log(this.state.showEditNickname);
  }

  toggleBio() {
    this.setState({
      showEditBio: !this.state.showEditBio
    });
    console.log(this.state.showEditBio);
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
    // this.props.fetchProfile(window.myUser);
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
        {/* {console.log(window.myUser)} */}
        <div id='edit'>
          <span id='editBio'>
            <button onClick={this.toggleBio}>edit bio</button> 
          </span>
          <span id='editNickName'>
            <button onClick={this.toggleNickname}>edit nickname</button> 
          </span>
        </div>
        <img src={this.props.profile.profilePic}></img>
        <p>Name: {this.props.profile.display}</p>
        {
          this.state.showEditNickname ?
            <form onSubmit={handleSubmit(this.editNickname)}>
              <Field
                name='editNickname'
                component='input'
              />
              <button type = 'submit'>Change Nickname</button>
            </form> : <p>Nickname: {this.props.profile.nickname}</p>
        }
        <p>Email: {this.props.profile.email}</p>
        {
          this.state.showEditBio ? 
            <form onSubmit={handleSubmit(this.editProfile)}>
              <Field
                name='editProfile'
                component='textarea'
              />
              <button type = 'submit'>Change About Me</button>
            </form> : <p>About Me: {this.props.profile.aboutMe}</p> 
        }
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
