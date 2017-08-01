import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateProfileBio, fetchProfile, updateNickname } from '../actions';
import { Segment, Button, Container } from 'semantic-ui-react';
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
        <div>
          <Button.Group widths='2'>
            <Button onClick={this.toggleBio}>edit bio</Button>
            <Button onClick={this.toggleNickname}>edit nickname</Button> 
          </Button.Group>
        </div>
        <div className = 'ui two column grid'>
          <div className = 'row'>
            <div className = 'column'>
              <img className="ui medium circular image" src={this.props.profile.profilePic}></img>
            </div>
            <div className = 'column'>
              <Segment >
                <p><b>Name:</b> {this.props.profile.display}</p>
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
                        name='editProfile'
                        component='textarea'
                      />
                      <div>
                        <Button type='submit' className="ui teal button mini">Change About Me</Button>
                      </div>
                    </form> : <p><b>About Me: </b>{this.props.profile.aboutMe}</p> 
                }
              </Segment>
            </div>
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
