import gql from 'graphql-tag';


export const SIGNUP = gql`
    mutation signUp($signupInput: RegisterUserInput!) {
        signUp(signupInput: $signupInput) {
            access_token
        }
    }
`;


export const LOGIN =  gql`
mutation login($input: LoginInput!) {	
    login(input: $input) {
        access_token
        user {
            orgId
            roles
        }
    }
}
`;