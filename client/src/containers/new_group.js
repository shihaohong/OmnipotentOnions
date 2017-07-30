import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createGroup } from '../actions';

import shortid from 'shortid';

class NewGroup extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field; 
    
    return (
      <div>
        <input type='text' {...field.input} />
      </div>
    );
  }

  onSubmit(e) {
    let newGroupName = e.groupName;
    let profile_id = this.props.profile.id;
    let shortID = shortid.generate();
    e.groupName = '';
    this.props.createGroup(newGroupName, profile_id, shortID);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name='groupName'
            component={this.renderField}
          />
          <button type='submit'>Create Group</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groupName: state.groupName };
};

export default reduxForm({
  form: 'GroupsForm'
})(
  connect(mapStateToProps, { createGroup })(NewGroup)
);
