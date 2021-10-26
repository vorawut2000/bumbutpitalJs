import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      password
      name
      surname
      email
      phoneNumber
    }
  }
`;

export const GET_USER = gql`
query getUser($id: ID!) {
  getUser(id: $id) {
    username
    name
    surname
    email
    phoneNumber
    appropiatePHQSeverity
    appropiatePHQSeverityScore
  }
}
`;
