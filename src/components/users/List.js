import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { allUsersQuery, likedUserQuery } from '../../queries/users';
import ListItem from './ListItem.js'

class List extends Component {

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: likedUserQuery,
      updateQuery: (prev, {subscriptionData}) => {
        return prev;
      }
    });
  }

  render() {
    const {loading, error, allUsers} = this.props.data;
    if (loading) {
      return <div>Cargando...</div>;
    }
    if (error) {
      return <div>${error}</div>;
    }
    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Editar</th>
            <th>Eliminar</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th></th>
          
          </tr>
          { allUsers.map(user => <ListItem
            key={user.id}
            user={user}
            editUser={this.props.editUser}
            alert={this.props.alert} />) }
        </tbody>
      </table>
    );
  }
}

export default graphql(allUsersQuery)(List);
