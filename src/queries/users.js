import gql from 'graphql-tag';

export const allUsersQuery = gql`
  query allUsers {
    allUsers {
      id
      name
      email
      likes
    }
  }
`;

export const createUserQuery = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const updateUserQuery = gql`
  mutation updateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const likeUserQuery = gql`
  mutation updateUser($id: ID!, $likes: Int!) {
    updateUser(id: $id, likes: $likes) {
      id
      likes
    }
  }
`;

export const deleteUserQuery = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const likedUserQuery = gql`
  subscription likedUser {
    User(
      filter: {
        mutation_in: [UPDATED]
        updatedFields_contains: "likes"
      }
    ) {
      mutation
      node {
        id
        likes
      }
    }
  }
`
