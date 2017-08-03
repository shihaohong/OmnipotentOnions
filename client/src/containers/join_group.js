import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { joinGroup } from '../actions';

import { Form, Icon, Menu, Button } from 'semantic-ui-react';

class JoinGroup extends Component {
  renderField(field) {
    // console.log('Field: ', field);
    const { meta: { touched, error, warning }} = field; 
    return (
      <Form.Input 
                  className='inputForm' 
                  transparent={true} 
                  size='large'
                  placeholder='enter group code'
                  type='text' {...field.input}/>
    );
  } 

  required(value) {
    return value ? undefined : <p>Required</p>;
  }


  onSubmit(e) {
    console.log('shortID & profileID: ', e.shortId, this.props.profile.id);
    let shortID = e.shortID;
    let profile_id = this.props.profile.id;
    e.shortId = '';
    this.props.joinGroup(shortID, profile_id);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form inverted={true} onSubmit={handleSubmit(this.onSubmit.bind(this)) }>        
        <Field name="shortId" component={ this.renderField } validate={[this.required]}/>
        <Form.Button className='formButton' type='submit' color='teal' size='mini'>
          Join Group
        </Form.Button>
      </Form>
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


/* ---------------------------------------- */

// const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
//   <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
// )
// const required = value => {
//   return value ? undefined  : <p> Required </p>
// };
// submit(values) {
//     console.log('values: ', values);
//   }
// //inbetween render and return 
// const { handleSubmit } = this.props;
// <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
//   <Field name="first_name" component={ renderTextField } validate={[required]} label="First Name" width={8}/>
//   <Button primary type="submit">Update</Button>
// </Form>