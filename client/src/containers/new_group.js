import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createGroup } from '../actions';

import shortid from 'shortid';

import { Form, Icon, Menu } from 'semantic-ui-react';

class NewGroup extends Component {
  renderField(field) {
    // console.log('Field: ', field);
    const { meta: { touched, error, warning }} = field; 
    return (
      <Form.Input 
                  className='inputForm' 
                  transparent={true} 
                  size='large'
                  placeholder='enter new group name'
                  type='text' {...field.input}/>
    );
  } 

  required(value) {
    return value ? undefined : <p>Required</p>;
  }

  onSubmit(e) {
    console.log('NEW GROUP: ', e);
    let newGroupName = e.groupName;
    let profile_id = this.props.profile.id;
    let shortID = shortid.generate();
    e.groupName = '';
    this.props.createGroup(newGroupName, profile_id, shortID);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form inverted={true} onSubmit={handleSubmit(this.onSubmit.bind(this)) }>        
        <Field name="groupName" component={ this.renderField } validate={[this.required]}/>
        <Form.Button className='formButton' type='submit' color='teal' size='mini'>
          New Group 
        </Form.Button>
      </Form>
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

      // <div>
      //   <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      //     <Field
      //       name='groupName'
      //       component={this.renderField}
      //     />
      //     <button type='submit'>Create Group</button>
      //   </form>
      // </div>


