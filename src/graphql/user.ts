import gql from 'graphql-tag';


export const GET_ORG_USERS = gql`
  query GetOrgUsers {
    getOrgUsers {
      id
      email
      firstName
      lastName
    }
  }
`; 

export const GET_USER_BY_ID = gql`
 query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      email
      roles
      lastLogin
    }
  }
`