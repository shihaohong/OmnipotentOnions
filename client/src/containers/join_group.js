import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { joinGroup } from '../actions';

class JoinGroup extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field; 

    return (
      <div className='shortID'>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  onSubmit(group) {
    let shortID = group.shortID;
    let profile_id = this.props.profile.id;
    this.props.joinGroup(shortID, profile_id);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label='Add new group'
            name='shortID'
            component={this.renderField}
          />
          <button type='submit'>Join Group</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { group: state.group };
};

export default reduxForm({
  form: 'formReducer'
})(
  connect(mapStateToProps, { joinGroup })(JoinGroup)
);
