import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { allUsersQuery, createUserQuery } from '../../queries/users';
import Form from './Form';

class Add extends Component {

  state = {
    alert: ''
  }

  handleSubmit = (values) => {
    const { name, email } = values;
    const { mutate, alert, close } = this.props;
    mutate({
      variables: { name, email },
      refetchQueries: [ { query: allUsersQuery }]
    })
    .then((res) => {
      alert({
        success: 'The user was created!'
      });
      close();
    }).catch((error) => {
      this.setState({
        alert: {
          type: 'danger',
          message: error.message
        }
      });
    });
  }

  render() {

    return (
      <Form
        modalId="addUserModal"
        title="Agregarr"
        handleSubmit={this.handleSubmit}
        user={this.props.user}
        close={this.props.close}
        alert={this.state.alert} />
    );
  }
}

export default graphql(createUserQuery)(Add);
